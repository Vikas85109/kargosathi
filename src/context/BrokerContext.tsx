import {
  createContext, useContext, useReducer, useEffect, useCallback, type ReactNode,
} from 'react';
import type { BrokerApplication, BrokerFormData, AppStatus } from '../types';
import * as api from '../services/api';

// ---- Empty form defaults ----
export const emptyForm: BrokerFormData = {
  name: '', phone: '', email: '', city: '', experience: '',
  companyName: '', gst: '', pan: '', address: '', businessType: '',
  panFile: '', gstFile: '', aadhaarFile: '', chequeFile: '',
  accountName: '', accountNumber: '', ifsc: '', upi: '',
  routes: [], truckTypes: [], loadTypes: [],
  commissionType: '', commissionPercent: '',
};

interface State {
  applications: BrokerApplication[];
  formData: BrokerFormData;
  currentStep: number;
  loading: boolean;
}

type Action =
  | { type: 'SET_APPS'; apps: BrokerApplication[] }
  | { type: 'SET_FORM'; data: Partial<BrokerFormData> }
  | { type: 'SET_STEP'; step: number }
  | { type: 'RESET_FORM' }
  | { type: 'SET_LOADING'; loading: boolean };

interface BrokerContextValue extends State {
  updateForm: (data: Partial<BrokerFormData>) => void;
  goToStep: (step: number) => void;
  submit: () => Promise<BrokerApplication>;
  updateStatus: (id: string, status: AppStatus, remarks?: string) => Promise<void>;
  refresh: () => Promise<void>;
  resetForm: () => void;
  getAppByPhone: (phone: string) => BrokerApplication | undefined;
}

const BrokerContext = createContext<BrokerContextValue | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_APPS':
      return { ...state, applications: action.apps };
    case 'SET_FORM':
      return { ...state, formData: { ...state.formData, ...action.data } };
    case 'SET_STEP':
      return { ...state, currentStep: action.step };
    case 'RESET_FORM':
      return { ...state, formData: emptyForm, currentStep: 1 };
    case 'SET_LOADING':
      return { ...state, loading: action.loading };
    default:
      return state;
  }
}

export function BrokerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    applications: [],
    formData: emptyForm,
    currentStep: 1,
    loading: true,
  });

  // Hydrate from localStorage
  useEffect(() => {
    (async () => {
      const apps = await api.getApplications();
      dispatch({ type: 'SET_APPS', apps });

      const draft = api.getDraft();
      if (draft) {
        dispatch({ type: 'SET_FORM', data: draft.formData });
        dispatch({ type: 'SET_STEP', step: draft.step });
      }
      dispatch({ type: 'SET_LOADING', loading: false });
    })();
  }, []);

  const updateForm = useCallback((data: Partial<BrokerFormData>) => {
    dispatch({ type: 'SET_FORM', data });
  }, []);

  // Auto-save draft when form or step changes
  const goToStep = useCallback(
    (step: number) => {
      dispatch({ type: 'SET_STEP', step });
      api.saveDraft({ formData: state.formData, step });
    },
    [state.formData]
  );

  const submit = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', loading: true });
    const app = await api.submitApplication(state.formData as BrokerFormData);
    const apps = await api.getApplications();
    dispatch({ type: 'SET_APPS', apps });
    dispatch({ type: 'RESET_FORM' });
    dispatch({ type: 'SET_LOADING', loading: false });
    return app;
  }, [state.formData]);

  const updateStatus = useCallback(async (id: string, status: AppStatus, remarks = '') => {
    await api.updateApplicationStatus(id, status, remarks);
    const apps = await api.getApplications();
    dispatch({ type: 'SET_APPS', apps });
  }, []);

  const refresh = useCallback(async () => {
    const apps = await api.getApplications();
    dispatch({ type: 'SET_APPS', apps });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET_FORM' });
    api.clearDraft();
  }, []);

  const getAppByPhone = useCallback(
    (phone: string) => state.applications.find((a) => a.phone === phone),
    [state.applications]
  );

  return (
    <BrokerContext.Provider
      value={{
        ...state,
        updateForm,
        goToStep,
        submit,
        updateStatus,
        refresh,
        resetForm,
        getAppByPhone,
      }}
    >
      {children}
    </BrokerContext.Provider>
  );
}

export function useBroker() {
  const ctx = useContext(BrokerContext);
  if (!ctx) throw new Error('useBroker must be inside BrokerProvider');
  return ctx;
}
