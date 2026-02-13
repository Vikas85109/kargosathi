import { useEffect, useRef } from 'react';
import { saveDraft } from '../services/api';
import type { BrokerFormData } from '../types';

/**
 * Auto-saves the onboarding draft to localStorage whenever formData changes.
 * Debounced to 500ms to avoid excessive writes.
 */
export function useDraftSave(formData: Partial<BrokerFormData>, step: number) {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      saveDraft({ formData, step });
    }, 500);
    return () => clearTimeout(timer.current);
  }, [formData, step]);
}
