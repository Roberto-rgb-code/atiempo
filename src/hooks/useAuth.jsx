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

// Usaremos HashRouter, así que los redirects deben ir a rutas con hash:
const DASHBOARD_HASH = '#/dashboard';
const HOME_HASH = '#/';

const POST_AUTH_KEY = 'postAuthRedirectHash';

function setPostAuthRedirectHash(hash = DASHBOARD_HASH) {
  try { sessionStorage.setItem(POST_AUTH_KEY, hash); } catch {}
}

function consumePostAuthRedirectHash() {
  try {
    const v = sessionStorage.getItem(POST_AUTH_KEY);
    if (v) sessionStorage.removeItem(POST_AUTH_KEY);
    return v;
  } catch {
    return null;
  }
}

// Helpers de redirección con hash (no dependen del Router)
function goToHash(hash) {
  try {
    if (window.location.hash !== hash) {
      window.location.hash = hash;           // no recarga; navega dentro del SPA
    } else {
      // Si ya estás en el mismo hash, forzamos un replace para “refrescar” el estado
      window.location.replace(`${window.location.pathname}${hash}`);
    }
  } catch {}
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

          // Si venimos de un flujo post-auth, aplica la redirección hash
          if (fbUser) {
            const targetHash = consumePostAuthRedirectHash();
            if (targetHash) {
              goToHash(targetHash);
            }
          }
        });
      }
    })();

    return () => unsub();
  }, []);

  // --- Registro con correo/contraseña ---
  async function register({ email, password, displayName }) {
    setPostAuthRedirectHash(DASHBOARD_HASH);
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) await updateProfile(cred.user, { displayName });
    // Fallback inmediato (por si no se activa el listener aún)
    goToHash(DASHBOARD_HASH);
    return cred.user;
  }

  // --- Login con correo/contraseña ---
  async function login({ email, password }) {
    setPostAuthRedirectHash(DASHBOARD_HASH);
    const cred = await signInWithEmailAndPassword(auth, email, password);
    goToHash(DASHBOARD_HASH);
    return cred.user;
  }

  // --- Login con Google ---
  async function loginWithGoogle() {
    const isLocal =
      typeof window !== 'undefined' &&
      (location.hostname === 'localhost' || location.hostname === '127.0.0.1');

    setPostAuthRedirectHash(DASHBOARD_HASH);

    if (!isLocal) {
      // Producción: redirect (más estable) → al volver, el listener lee el hash guardado
      await signInWithRedirect(auth, googleProvider);
      return;
    }

    // Local: intenta popup, cae a redirect si falla
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      goToHash(DASHBOARD_HASH);
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
    goToHash(HOME_HASH); // vuelve siempre a la landing con hash
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
