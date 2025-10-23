import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

// Componente Button
const Button = ({ children, onClick, type = "button", variant = "primary", size = "md", className = "", disabled = false }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300";
  
  const variants = {
    primary: "bg-black text-[#D8F9A0] hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed",
    outline: "border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
  };
  
  const sizes = {
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={{ fontFamily: 'Satoshi, sans-serif' }}
    >
      {children}
    </button>
  );
};

// Componente Input
const Input = ({ label, type = "text", name, icon, value, onChange, placeholder, error, required = false }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 500 }}>
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D8F9A0] focus:border-transparent transition-all duration-200 ${
            error ? 'border-red-300 focus:ring-red-200' : 'border-gray-300'
          }`}
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          {error}
        </p>
      )}
    </div>
  );
};

const LoginForm = ({ onSwitchToRegister = () => {} }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await login({ email: formData.email, password: formData.password });
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setErrors({ general: 'Error al iniciar sesión. Verifica tus credenciales.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Importar fuentes */}
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Satoshi:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/30">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-md border border-gray-200">
              <img 
                src="/logo-horizontal.jpg" 
                alt="A Tiempo" 
                className="h-16 w-auto"
              />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Iniciar Sesión
            </h2>
            <p className="text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 400 }}>
              Accede a tu cuenta de A Tiempo
            </p>
          </div>

          {/* Error General */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {errors.general}
              </p>
            </div>
          )}

          {/* Formulario */}
          <div className="space-y-5">
            <Input
              label="Email"
              type="email"
              name="email"
              icon={<Mail size={18} />}
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              error={errors.email}
              required
            />

            <div className="relative">
              <Input
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                name="password"
                icon={<Lock size={18} />}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                error={errors.password}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Olvidaste contraseña */}
            <div className="flex justify-end">
              <a 
                href="#" 
                className="text-sm text-gray-600 hover:text-black font-medium hover:underline"
                style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 500 }}
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Botón de login */}
            <Button
              type="submit"
              onClick={handleSubmit}
              variant="primary"
              size="lg"
              className="w-full shadow-lg hover:shadow-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>

            {/* Link a registro */}
            <p className="text-center text-sm text-gray-600 pt-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              ¿No tienes cuenta?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-gray-900 hover:text-black font-semibold hover:underline"
                style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}
              >
                Regístrate aquí
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;