import type { BrokerApplication, BrokerFormData, AppStatus, SessionUser, DashboardStats } from '../types';
import { dashboardStats } from '../mock/data';

// ---- Helpers ----
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

const KEYS = {
  APPLICATIONS: 'brokerApplications',
  SESSION: 'sessionUser',
  DRAFT: 'onboardingDraft',
} as const;

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

function remove(key: string) {
  localStorage.removeItem(key);
}

// ---- Auth ----
export async function loginBroker(phone: string, name: string): Promise<SessionUser> {
  await delay(300);
  const user: SessionUser = { phone, name, role: 'broker' };
  write(KEYS.SESSION, user);
  return user;
}

export async function loginAdmin(username: string, password: string): Promise<SessionUser> {
  await delay(300);
  if (username !== 'admin' || password !== 'admin') {
    throw new Error('Invalid credentials');
  }
  const user: SessionUser = { name: 'Admin', role: 'admin' };
  write(KEYS.SESSION, user);
  return user;
}

export function getSession(): SessionUser | null {
  return read<SessionUser>(KEYS.SESSION);
}

export function logout() {
  remove(KEYS.SESSION);
}

// ---- Draft ----
export async function saveDraft(data: { formData: Partial<BrokerFormData>; step: number }): Promise<void> {
  await delay(100);
  write(KEYS.DRAFT, data);
}

export function getDraft(): { formData: Partial<BrokerFormData>; step: number } | null {
  return read(KEYS.DRAFT);
}

export function clearDraft() {
  remove(KEYS.DRAFT);
}

// ---- Applications ----
export async function getApplications(): Promise<BrokerApplication[]> {
  await delay(200);
  return read<BrokerApplication[]>(KEYS.APPLICATIONS) || [];
}

export async function submitApplication(formData: BrokerFormData): Promise<BrokerApplication> {
  await delay(500);
  const apps = read<BrokerApplication[]>(KEYS.APPLICATIONS) || [];
  const app: BrokerApplication = {
    ...formData,
    id: `BRK-${Date.now()}`,
    status: 'submitted',
    adminRemarks: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  apps.push(app);
  write(KEYS.APPLICATIONS, apps);
  clearDraft();
  return app;
}

export async function updateApplicationStatus(
  id: string,
  status: AppStatus,
  remarks = ''
): Promise<BrokerApplication | null> {
  await delay(300);
  const apps = read<BrokerApplication[]>(KEYS.APPLICATIONS) || [];
  const idx = apps.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  apps[idx] = {
    ...apps[idx],
    status,
    adminRemarks: remarks,
    updatedAt: new Date().toISOString(),
  };
  write(KEYS.APPLICATIONS, apps);
  return apps[idx];
}

export async function getApplicationByPhone(phone: string): Promise<BrokerApplication | null> {
  const apps = await getApplications();
  return apps.find((a) => a.phone === phone) || null;
}

export async function getApplicationById(id: string): Promise<BrokerApplication | null> {
  const apps = await getApplications();
  return apps.find((a) => a.id === id) || null;
}

// ---- Dashboard ----
export async function getDashboardData(): Promise<DashboardStats> {
  await delay(200);
  return dashboardStats;
}
