import React, { useState } from 'react';
import { Eye, EyeOff, Mail, User, Building, Lock } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ onSwitchToLogin }) => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.email) newErrors.email = 'El email es requerido';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email inválido';
    if (!formData.company.trim())
      newErrors.company = 'La empresa es requerida';
    if (!formData.password)
      newErrors.password = 'La contraseña es requerida';
    else if (formData.password.length < 6)
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    if (!formData.confirmPassword)
      newErrors.confirmPassword = 'Confirma tu contraseña';
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await register({
        email: formData.email,
        password: formData.password,
        displayName: formData.name,
      });
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setErrors({ general: 'Error al registrarse' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Crear Cuenta</h2>
        <p className="text-gray-600 mt-2">
          Únete a A Tiempo y simplifica tu trabajo legal
        </p>
      </div>

      {errors.general && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{errors.general}</p>
        </div>
      )}

      <Input
        label="Nombre completo"
        type="text"
        name="name"
        icon={<User size={18} />}
        value={formData.name}
        onChange={handleChange}
        placeholder="Tu nombre completo"
        error={errors.name}
        required
      />

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

      <Input
        label="Empresa"
        type="text"
        name="company"
        icon={<Building size={18} />}
        value={formData.company}
        onChange={handleChange}
        placeholder="Nombre de tu empresa o notaría"
        error={errors.company}
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
          className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="relative">
        <Input
          label="Confirmar contraseña"
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
          error={errors.confirmPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          required
          className="mt-1 rounded border-gray-300 text-[#D8F9A0] focus:ring-[#D8F9A0]"
        />
        <label className="ml-2 text-sm text-gray-600">
          Acepto los{' '}
          <a href="#" className="text-gray-900 hover:underline">
            términos y condiciones
          </a>{' '}
          y la{' '}
          <a href="#" className="text-gray-900 hover:underline">
            política de privacidad
          </a>
        </label>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta'}
      </Button>

      <p className="text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-gray-900 hover:underline font-medium"
        >
          Inicia sesión aquí
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;
