import React, { useState } from 'react';
import useAuth from './hooks/useAuth';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import FeaturesSection from './components/sections/FeaturesSection';
import PricingSection from './components/sections/PricingSection';
import ContactSection from './components/sections/ContactSection';
import WhatsAppWidget from './components/ui/WhatsAppWidget';
import Modal from './components/ui/Modal';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';

function App() {
  const { isLoggedIn, currentUser, login, register, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  const handleShowAuth = (mode = 'login') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleCloseAuth = () => {
    setShowAuthModal(false);
  };

  const handleLogin = (userData) => {
    const result = login(userData);
    if (result.success) {
      setShowAuthModal(false);
    }
    return result;
  };

  const handleRegister = (userData) => {
    const result = register(userData);
    if (result.success) {
      setShowAuthModal(false);
    }
    return result;
  };

  const handleLogout = () => {
    logout();
  };

  const switchToLogin = () => setAuthMode('login');
  const switchToRegister = () => setAuthMode('register');

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onShowAuth={handleShowAuth}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main>
        <HeroSection onShowAuth={handleShowAuth} />
        <AboutSection />
        <FeaturesSection />
        <PricingSection onShowAuth={handleShowAuth} />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Widget */}
      <WhatsAppWidget />

      {/* Auth Modal */}
      <Modal
        isOpen={showAuthModal}
        onClose={handleCloseAuth}
        title={authMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
        size="md"
      >
        {authMode === 'login' ? (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToRegister={switchToRegister}
          />
        ) : (
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={switchToLogin}
          />
        )}
      </Modal>
    </div>
  );
}

export default App;