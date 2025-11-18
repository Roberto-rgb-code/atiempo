import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Hook de Auth
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

// Formularios (se usan dentro del modal)
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import DemoForm from './components/forms/DemoForm';

// Páginas dedicadas
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';

// Rutas con guardas
import ProtectedRoute from './routes/ProtectedRoute';
import PublicOnlyRoute from './routes/PublicOnlyRoute';

function Home({ onShowAuth, onShowDemo }) {
  return (
    <>
      <HeroSection onShowAuth={onShowAuth} onShowDemo={onShowDemo} />
      <AboutSection />
      <FeaturesSection onShowDemo={onShowDemo} />
      <PricingSection onShowAuth={onShowAuth} />
      <ContactSection onShowDemo={onShowDemo} />
    </>
  );
}

export default function App() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [showDemoModal, setShowDemoModal] = useState(false);

  // 🔑 Cuando cambia la ruta, si estamos en dashboard, cierra el modal
  useEffect(() => {
    if (location.pathname === '/dashboard') {
      setShowAuthModal(false);
      setShowDemoModal(false);
    }
  }, [location.pathname]);

  const handleShowAuth = (mode = 'login') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleCloseAuth = () => setShowAuthModal(false);

  const handleShowDemo = () => {
    setShowDemoModal(true);
  };

  const handleCloseDemo = () => setShowDemoModal(false);

  const switchToLogin = () => setAuthMode('login');
  const switchToRegister = () => setAuthMode('register');

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
          {/* Rutas públicas */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/" element={<Home onShowAuth={handleShowAuth} onShowDemo={handleShowDemo} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Rutas privadas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <Footer />
      <WhatsAppWidget />

      {/* Modal de autenticación */}
      <Modal
        isOpen={showAuthModal}
        onClose={handleCloseAuth}
        title={authMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
        size="md"
      >
        {authMode === 'login' ? (
          <LoginForm onSwitchToRegister={switchToRegister} />
        ) : (
          <RegisterForm onSwitchToLogin={switchToLogin} />
        )}
      </Modal>

      {/* Modal de solicitar demo */}
      <Modal
        isOpen={showDemoModal}
        onClose={handleCloseDemo}
        title="Solicitar Demo"
        size="md"
      >
        <DemoForm onClose={handleCloseDemo} />
      </Modal>
    </div>
  );
}
