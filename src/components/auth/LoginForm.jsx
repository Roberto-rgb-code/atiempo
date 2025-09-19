import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Loader2, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import Input from '../ui/Input';

const GoogleIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.67 4.1-5.5 4.1-3.31 0-6-2.74-6-6.1s2.69-6.1 6-6.1c1.89 0 3.16.8 3.89 1.5l2.65-2.6C16.97 3.3 14.7 2.3 12 2.3 6.98 2.3 2.9 6.4 2.9 11.5S6.98 20.7 12 20.7c6.01 0 9.1-4.2 9.1-8.1 0-.54-.06-.93-.14-1.34H12z"/>
  </svg>
);

const LoginForm = ({ onSwitchToRegister, onAuthSuccess }) => {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
    if (errors.general) setErrors((p) => ({ ...p, general: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'El email es requerido';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.password) newErrors.password = 'La contraseña es requerida';
    else if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await login({ email: formData.email, password: formData.password });
      onAuthSuccess?.();
      navigate('/dashboard', { replace: true });
    } catch (error) {
      const code = error?.code || '';
      const map = {
        'auth/invalid-email': 'Correo inválido.',
        'auth/user-not-found': 'No existe una cuenta con ese correo.',
        'auth/wrong-password': 'Contraseña incorrecta.',
        'auth/too-many-requests': 'Demasiados intentos. Inténtalo más tarde.',
      };
      setErrors({ general: map[code] || 'Error al iniciar sesión.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setErrors({});
    setIsGoogleLoading(true);
    try {
      await loginWithGoogle();
      onAuthSuccess?.();
      navigate('/dashboard', { replace: true });
    } catch (error) {
      const code = error?.code || '';
      const map = {
        'auth/popup-closed-by-user': 'Ventana cerrada antes de finalizar.',
        'auth/cancelled-popup-request': 'Se canceló el inicio de sesión.',
        'auth/account-exists-with-different-credential':
          'Ya existe una cuenta con distinto método. Usa el método asociado.',
      };
      setErrors({ general: map[code] || 'Error al iniciar con Google.' });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6 sm:p-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
          <LogIn size={14} />
          Acceso seguro
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mt-3">Iniciar Sesión</h2>
        <p className="text-gray-600 mt-2">Accede a tu cuenta de A Tiempo</p>
      </div>

      {errors.general && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
          <p className="text-red-600 text-sm">{errors.general}</p>
        </div>
      )}

      {/* Google */}
      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={handleGoogle}
        disabled={isGoogleLoading}
      >
        {isGoogleLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Conectando…
          </>
        ) : (
          <>
            <GoogleIcon />
            Continuar con Google
          </>
        )}
      </Button>

      {/* Divider */}
      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-2 text-xs text-gray-500">o con tu correo</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="mb-1 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Mail className="w-4 h-4" />
            Email
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            error={errors.email}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="mb-1 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Lock className="w-4 h-4" />
            Contraseña
          </label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              error={errors.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-[#D8F9A0] focus:ring-[#D8F9A0]"
            />
            <span className="ml-2 text-gray-600">Recordarme</span>
          </label>
          <a href="/login#reset" className="text-gray-600 hover:text-gray-900">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 inline-block animate-spin" />
              Iniciando…
            </>
          ) : (
            'Iniciar Sesión'
          )}
        </Button>

        <p className="text-center text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-gray-900 hover:underline font-medium"
          >
            Regístrate aquí
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
