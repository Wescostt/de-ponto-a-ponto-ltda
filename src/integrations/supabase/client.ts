import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const REMEMBER_ME_KEY = 'dpp_remember_me';

export function getRememberMe(): boolean {
  if (typeof window === 'undefined') return true;
  // Default to true if not explicitly set
  const val = window.localStorage.getItem(REMEMBER_ME_KEY);
  return val === null ? true : val === 'true';
}

export function setRememberMe(value: boolean) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(REMEMBER_ME_KEY, value ? 'true' : 'false');
}

const dynamicAuthStorage = {
  getItem: (key: string) => {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(key) ?? window.sessionStorage.getItem(key);
  },

  setItem: (key: string, value: string) => {
    if (typeof window === 'undefined') return;
    const remember = getRememberMe();
    if (remember) {
      window.sessionStorage.removeItem(key);
      window.localStorage.setItem(key, value);
    } else {
      window.localStorage.removeItem(key);
      window.sessionStorage.setItem(key, value);
    }
  },

  removeItem: (key: string) => {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(key);
    window.sessionStorage.removeItem(key);
  },
};

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: dynamicAuthStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  }
});