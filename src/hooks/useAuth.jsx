import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const user = localStorage.getItem('atiempo_user');
      if (user) {
        const userData = JSON.parse(user);
        setCurrentUser(userData);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      localStorage.removeItem('atiempo_user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    try {
      setCurrentUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem('atiempo_user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Error al iniciar sesión' };
    }
  };

  const register = (userData) => {
    try {
      const user = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        company: userData.company,
        createdAt: new Date().toISOString()
      };
      
      setCurrentUser(user);
      setIsLoggedIn(true);
      localStorage.setItem('atiempo_user', JSON.stringify(user));
      return { success: true };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Error al registrarse' };
    }
  };

  const logout = () => {
    try {
      setIsLoggedIn(false);
      setCurrentUser(null);
      localStorage.removeItem('atiempo_user');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: 'Error al cerrar sesión' };
    }
  };

  return {
    isLoggedIn,
    currentUser,
    loading,
    login,
    register,
    logout
  };
};

export default useAuth;