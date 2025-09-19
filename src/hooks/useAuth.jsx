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
const POST_AUTH_KEY = 'postAuthRedirect';
const DEFAULT_REDIRECT = '/dashboard';

function setPostAuthRedirect(path = DEFAULT_REDIRECT) {
  try {
    sessionStorage.setItem(POST_AUTH_KEY, path);
  } catch {}
}

function consumePostAuthRedirect() {
  try {
    const v = sessionStorage.getItem(POST_AUTH_KEY);
    if (v) sessionStorage.removeItem(POST_AUTH_KEY);
    return v;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let unsub = () => {};

    (async () => {
      try {
        // Si venimos de signInWithRedirect, resuélvelo (ignora si no aplica)
        await getRedirectResult(auth);
      } catch (err) {
        console.error('[Google Redirect Error]', err?.code, err?.message);
      } finally {
        unsub = onAuthStateChanged(auth, (fbUser) => {
          setUser(fbUser || null);
          setLoading(false);

          // 🚀 Redirección fuerte post-auth si dejamos una intención guardada
          if (fbUser) {
            const target = consumePostAuthRedirect();
            if (target) {
              // replace evita que el usuario “regrese” al callback de Google con back
              window.location.replace(target);
            }
          }
        });
      }
    })();

    return () => unsub();
  }, []);

  // --- Registro con correo/contraseña ---
  async function register({ email, password, displayName }) {
    setPostAuthRedirect(DEFAULT_REDIRECT);
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(cred.user, { displayName });
    }
    // Fallback local (si no hay redirect flow)
    try { window.location.assign(DEFAULT_REDIRECT); } catch {}
    return cred.user;
  }

  // --- Login con correo/contraseña ---
  async function login({ email, password }) {
    setPostAuthRedirect(DEFAULT_REDIRECT);
    const cred = await signInWithEmailAndPassword(auth, email, password);
    // Fallback local
    try { window.location.assign(DEFAULT_REDIRECT); } catch {}
    return cred.user;
  }

  // --- Login con Google ---
  async function loginWithGoogle() {
    const isLocal =
      typeof window !== 'undefined' &&
      (location.hostname === 'localhost' || location.hostname === '127.0.0.1');

    setPostAuthRedirect(DEFAULT_REDIRECT);

    if (!isLocal) {
      // En producción: redirect (más estable en Vercel)
      await signInWithRedirect(auth, googleProvider);
      return;
    }

    // En local: intenta popup, cae a redirect si falla
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      // Fallback local por si no hay redirect
      try { window.location.assign(DEFAULT_REDIRECT); } catch {}
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

  // --- Logout ---
  async function logout() {
    await signOut(auth);
    try { window.location.assign('/'); } catch {}
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
