import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

// Hook de Auth (Firebase)
import { useAuth } from './hooks/useAuth';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Secciones de la landing
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import FeaturesSection from './components/sections/FeaturesSection';
import PricingSection from './components/sections/PricingSection';
import ContactSection from './components/sections/ContactSection';

// UI extra
import WhatsAppWidget from './components/ui/WhatsAppWidget';
import Modal from './components/ui/Modal';

// Formularios (dentro del modal)
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';

// Páginas dedicadas
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';

// Rutas con guardas
import ProtectedRoute from './routes/ProtectedRoute';
import PublicOnlyRoute from './routes/PublicOnlyRoute';

function Home({ onShowAuth }) {
  return (
    <>
      <HeroSection onShowAuth={onShowAuth} />
      <AboutSection />
      <FeaturesSection />
      <PricingSection onShowAuth={onShowAuth} />
      <ContactSection />
    </>
  );
}

export default function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  const handleShowAuth = (mode = 'login') => {
    // si ya estás logeado y piden abrir auth, mejor ir directo al dashboard
    if (user) {
      navigate('/dashboard', { replace: true });
      return;
    }
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleCloseAuth = () => setShowAuthModal(false);
  const switchToLogin = () => setAuthMode('login');
  const switchToRegister = () => setAuthMode('register');

  // Props de compatibilidad para el Navbar
  const isLoggedIn = !!user;
  const currentUser = user
    ? {
        id: user.uid,
        name: user.displayName || user.email?.split('@')[0] || 'Usuario',
        email: user.email,
      }
    : null;

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true }); // redirige al home tras logout
  };

  // 1) Cierra el modal en cuanto detectamos usuario autenticado
  useEffect(() => {
    if (user) {
      setShowAuthModal(false);
    }
  }, [user]);

  // 2) No mostrar el modal fuera de la landing (solo en "/")
  const isOnHome = location.pathname === '/';
  const shouldRenderAuthModal = showAuthModal && isOnHome && !user;

  // 3) Bloqueo/restore del scroll cuando el modal está abierto (mejor UX)
  useEffect(() => {
    if (shouldRenderAuthModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [shouldRenderAuthModal]);

  // callback para cerrar modal + navegar al dashboard (lo usan los formularios)
  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onShowAuth={handleShowAuth}
        onLogout={handleLogout}
      />

      <div className="flex-1">
        <Routes>
          {/* Rutas públicas (si hay sesión, redirige a /dashboard) */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/" element={<Home onShowAuth={handleShowAuth} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <Footer />
      <WhatsAppWidget />

      {/* Modal de autenticación: solo en "/" y si no hay sesión */}
      {shouldRenderAuthModal && (
        <Modal
          isOpen={true}
          onClose={handleCloseAuth}
          title={authMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          size="md"
        >
          {authMode === 'login' ? (
            <LoginForm
              onSwitchToRegister={switchToRegister}
              onAuthSuccess={handleAuthSuccess} // 👈 cierre + navigate
            />
          ) : (
            <RegisterForm
              onSwitchToLogin={switchToLogin}
              onAuthSuccess={handleAuthSuccess} // 👈 cierre + navigate
            />
          )}
        </Modal>
      )}
    </div>
  );
}
