// ---- Application Status ----
export type AppStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'correction_required';

// ---- Auth ----
export type UserRole = 'broker' | 'admin';

export interface SessionUser {
  name: string;
  phone?: string;
  role: UserRole;
}

// ---- Broker Onboarding Form Data ----
export interface BasicInfo {
  name: string;
  phone: string;
  email: string;
  city: string;
  experience: string;
}

export interface CompanyInfo {
  companyName: string;
  gst: string;
  pan: string;
  address: string;
  businessType: string;
}

export interface Documents {
  panFile: string;
  gstFile: string;
  aadhaarFile: string;
  chequeFile: string;
}

export interface BankDetails {
  accountName: string;
  accountNumber: string;
  ifsc: string;
  upi: string;
}

export interface OperatingScope {
  routes: string[];
  truckTypes: string[];
  loadTypes: string[];
}

export interface CommissionConfig {
  commissionType: string;
  commissionPercent: number | string;
}

export interface BrokerFormData
  extends BasicInfo,
    CompanyInfo,
    Documents,
    BankDetails,
    OperatingScope,
    CommissionConfig {}

// ---- Broker Application (stored) ----
export interface BrokerApplication extends BrokerFormData {
  id: string;
  status: AppStatus;
  adminRemarks: string;
  createdAt: string;
  updatedAt: string;
}

// ---- Dashboard Mock Types ----
export interface Load {
  id: string;
  from: string;
  to: string;
  weight: string;
  truck: string;
  status: 'delivered' | 'in_transit' | 'booked';
  date: string;
  amount: number;
}

export interface Truck {
  id: string;
  number: string;
  type: string;
  capacity: string;
  driver: string;
  status: 'active' | 'idle' | 'maintenance';
  location: string;
}

export interface Payment {
  id: string;
  loadId: string;
  amount: number;
  status: 'paid' | 'pending' | 'processing';
  date: string;
  method: string;
}

export interface DashboardStats {
  totalLoads: number;
  activeTrucks: number;
  totalEarnings: number;
  pendingPayments: number;
}

export interface ChartPoint {
  month: string;
  earnings: number;
  loads: number;
}

// ---- Toast ----
export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}
