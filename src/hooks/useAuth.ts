'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';
import { login as authLogin, logout as authLogout, getSession } from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const session = getSession();
    setUser(session);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (userId: string, password: string) => {
    const result = authLogin(userId, password);
    if (result.success && result.user) {
      setUser(result.user);
      router.push('/dashboard');
      return { success: true };
    }
    return { success: false, error: result.error };
  }, [router]);

  const logout = useCallback(() => {
    authLogout();
    setUser(null);
    router.push('/login');
  }, [router]);

  return { user, isLoading, login, logout, isAuthenticated: !!user };
}
