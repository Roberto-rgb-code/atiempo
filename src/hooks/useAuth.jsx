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
        await getRedirectResult(auth);
      } catch (err) {
        console.error('[Google Redirect Error]', err?.code, err?.message);
      } finally {
        unsub = onAuthStateChanged(auth, (fbUser) => {
          setUser(fbUser || null);
          setLoading(false);

          if (fbUser) {
            const target = consumePostAuthRedirect();
            if (target) {
              // ✅ HashRouter se encarga, no metas `#/dashboard` a mano
              window.location.assign(`/#${target}`);
            }
          }
        });
      }
    })();

    return () => unsub();
  }, []);

  async function register({ email, password, displayName }) {
    setPostAuthRedirect(DEFAULT_REDIRECT);
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) await updateProfile(cred.user, { displayName });
    window.location.assign(`/#${DEFAULT_REDIRECT}`);
    return cred.user;
  }

  async function login({ email, password }) {
    setPostAuthRedirect(DEFAULT_REDIRECT);
    const cred = await signInWithEmailAndPassword(auth, email, password);
    window.location.assign(`/#${DEFAULT_REDIRECT}`);
    return cred.user;
  }

  async function loginWithGoogle() {
    const isLocal =
      typeof window !== 'undefined' &&
      (location.hostname === 'localhost' || location.hostname === '127.0.0.1');

    setPostAuthRedirect(DEFAULT_REDIRECT);

    if (!isLocal) {
      await signInWithRedirect(auth, googleProvider);
      return;
    }

    try {
      const cred = await signInWithPopup(auth, googleProvider);
      window.location.assign(`/#${DEFAULT_REDIRECT}`);
      return cred.user;
    } catch (err) {
      console.error('[Google Popup Error]', err?.code, err?.message);
      await signInWithRedirect(auth, googleProvider);
    }
  }

  async function logout() {
    await signOut(auth);
    window.location.assign('/#/');
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
