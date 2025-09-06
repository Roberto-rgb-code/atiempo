import React, { useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import Button from '../ui/Button';

const Navbar = ({ isLoggedIn, currentUser, onShowAuth, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  return (
    <nav className="bg-white shadow-sm relative z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo/Nombre de empresa */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="text-3xl font-bold text-[#D8F9A0]">)(</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">A Tiempo</h1>
                <p className="text-sm text-gray-600 -mt-1">Software Legal</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#inicio" className="text-gray-700 hover:text-black transition-colors">
                Inicio
              </a>
              <a href="#acerca" className="text-gray-700 hover:text-black transition-colors">
                Acerca de
              </a>
              <a href="#caracteristicas" className="text-gray-700 hover:text-black transition-colors">
                Características
              </a>
              <a href="#precios" className="text-gray-700 hover:text-black transition-colors">
                Precios
              </a>
              <a href="#contacto" className="text-gray-700 hover:text-black transition-colors">
                Contacto
              </a>
            </div>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-gray-700 hover:text-black transition-colors"
                >
                  <User size={20} />
                  <span className="font-medium">{currentUser?.name}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-500 border-b">
                        {currentUser?.email}
                      </div>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Mi Perfil
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Configuración
                      </a>
                      <button
                        onClick={onLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={16} className="mr-2" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onShowAuth('login')}
                  className="text-gray-700 hover:text-black font-medium transition-colors px-4 py-2"
                >
                  Iniciar Sesión
                </button>
                <Button 
                  onClick={() => onShowAuth('register')} 
                  variant="primary"
                  size="md"
                >
                  Registrarse
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-black transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <a
                href="#inicio"
                className="block px-3 py-2 text-gray-700 hover:text-black transition-colors"
              >
                Inicio
              </a>
              <a
                href="#acerca"
                className="block px-3 py-2 text-gray-700 hover:text-black transition-colors"
              >
                Acerca de
              </a>
              <a
                href="#caracteristicas"
                className="block px-3 py-2 text-gray-700 hover:text-black transition-colors"
              >
                Características
              </a>
              <a
                href="#precios"
                className="block px-3 py-2 text-gray-700 hover:text-black transition-colors"
              >
                Precios
              </a>
              <a
                href="#contacto"
                className="block px-3 py-2 text-gray-700 hover:text-black transition-colors"
              >
                Contacto
              </a>
              
              {isLoggedIn ? (
                <div className="pt-4 border-t">
                  <div className="px-3 py-2 text-sm text-gray-500">
                    {currentUser?.email}
                  </div>
                  <a href="#" className="block px-3 py-2 text-gray-700 hover:text-black">
                    Mi Perfil
                  </a>
                  <button
                    onClick={onLogout}
                    className="flex items-center w-full px-3 py-2 text-red-600 hover:text-red-800"
                  >
                    <LogOut size={16} className="mr-2" />
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t space-y-3">
                  <button
                    onClick={() => onShowAuth('login')}
                    className="w-full text-left px-3 py-2 text-gray-700 hover:text-black font-medium"
                  >
                    Iniciar Sesión
                  </button>
                  <Button 
                    onClick={() => onShowAuth('register')} 
                    variant="primary" 
                    className="w-full mx-3"
                    size="md"
                  >
                    Registrarse
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;