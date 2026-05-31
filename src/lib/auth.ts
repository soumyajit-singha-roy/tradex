import { User } from '@/types';

const VALID_CREDENTIALS = {
  userId: 'Dharmesh',
  password: 'Dharmesh@123',
};

const USER_DATA: User = {
  userId: 'Dharmesh',
  name: 'Dharmesh',
  clientId: 'AFSL-CL-2026-001',
  status: 'Active',
  membership: 'Premium Trading Client',
  broker: 'AFSL TradeX',
  lastLogin: '31-May-2026 09:15 AM',
};

export function login(userId: string, password: string): { success: boolean; user?: User; error?: string } {
  if (userId === VALID_CREDENTIALS.userId && password === VALID_CREDENTIALS.password) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('afsl_user', JSON.stringify(USER_DATA));
      localStorage.setItem('afsl_authenticated', 'true');
    }
    return { success: true, user: USER_DATA };
  }
  return { success: false, error: 'Invalid User ID or Password' };
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('afsl_user');
    localStorage.removeItem('afsl_authenticated');
  }
}

export function getSession(): User | null {
  if (typeof window === 'undefined') return null;
  const authenticated = localStorage.getItem('afsl_authenticated');
  if (authenticated !== 'true') return null;
  const userData = localStorage.getItem('afsl_user');
  if (!userData) return null;
  try {
    const session = JSON.parse(userData) as User;
    if (session.userId === 'Dharmesh') {
      session.name = 'Dharmesh';
    }
    return session;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('afsl_authenticated') === 'true';
}
