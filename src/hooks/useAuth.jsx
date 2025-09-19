// src/hooks/useAuth.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth, googleProvider } from '../lib/firebase';
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // 1) Registrar listener inmediatamente y limpiar correctamente
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      setUser(fbUser);
      setLoading(false);
    });

    // 2) Resolver posibles resultados del flujo por redirect (producción)
    getRedirectResult(auth).catch((err) => {
      // Útil para depurar en producción
      console.error('[Google Redirect Error]', err?.code, err?.message);
    });

    return () => unsub();
  }, []);

  async function register({ email, password, displayName }) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) await updateProfile(cred.user, { displayName });
    return cred.user;
  }

  async function login({ email, password }) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  }

  async function loginWithGoogle() {
    // En producción (Vercel), usa redirect por fiabilidad.
    const isLocal =
      typeof window !== 'undefined' &&
      (location.hostname === 'localhost' || location.hostname === '127.0.0.1');

    if (!isLocal) {
      await signInWithRedirect(auth, googleProvider);
      return; // La app continuará cuando vuelva del redirect
    }

    // En local, intenta popup y cae a redirect si falla
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      return cred.user;
    } catch (err) {
      console.error('[Google Popup Error]', err?.code, err?.message);
      const fallbackCodes = new Set([
        'auth/popup-blocked',
        'auth/popup-closed-by-user',
        'auth/cancelled-popup-request',
        'auth/operation-not-supported-in-this-environment',
      ]);
      if (fallbackCodes.has(err?.code)) {
        await signInWithRedirect(auth, googleProvider);
        return;
      }
      throw err;
    }
  }

  async function logout() {
    await signOut(auth);
  }

  const value = useMemo(
    () => ({ user, isLoading, register, login, loginWithGoogle, logout }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}
