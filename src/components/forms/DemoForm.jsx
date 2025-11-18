import React, { useState } from 'react';
import { User, Phone, Mail, Building, MapPin, Send } from 'lucide-react';

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
        {required && <span className="text-red-500 ml-1">*</span>}
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

const DemoForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    notaria: '',
    municipio: '',
    estado: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!/^[0-9+\s()-]+$/.test(formData.telefono)) {
      newErrors.telefono = 'Teléfono inválido';
    }
    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = 'Correo inválido';
    }
    if (!formData.notaria.trim()) {
      newErrors.notaria = 'El número de notaría es requerido';
    }
    if (!formData.municipio.trim()) {
      newErrors.municipio = 'El municipio es requerido';
    }
    if (!formData.estado.trim()) {
      newErrors.estado = 'El estado es requerido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Crear mensaje para WhatsApp
      const mensaje = `¡Hola! Me interesa solicitar una demo de A Tiempo.

📋 *Información de Contacto:*
• Nombre: ${formData.nombre}
• Teléfono: ${formData.telefono}
• Correo: ${formData.correo}

🏛️ *Información de Notaría:*
• No. Notaría: ${formData.notaria}
• Municipio: ${formData.municipio}
• Estado: ${formData.estado}

Espero su respuesta para agendar la demo.`;

      // Codificar el mensaje para URL
      const mensajeCodificado = encodeURIComponent(mensaje);
      
      // Abrir WhatsApp con el mensaje
      const whatsappUrl = `https://wa.me/523334087070?text=${mensajeCodificado}`;
      window.open(whatsappUrl, '_blank');
      
      // Cerrar el modal después de un breve delay
      setTimeout(() => {
        onClose();
        setFormData({
          nombre: '',
          telefono: '',
          correo: '',
          notaria: '',
          municipio: '',
          estado: ''
        });
      }, 500);
    } catch (error) {
      console.error(error);
      alert('Error al enviar el formulario. Por favor intenta nuevamente.');
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
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-gray-200">
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
              Solicitar Demo
            </h2>
            <p className="text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 400 }}>
              Completa el formulario y te contactaremos por WhatsApp
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Nombre Contacto"
              type="text"
              name="nombre"
              icon={<User size={18} />}
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              error={errors.nombre}
              required
            />

            <Input
              label="Teléfono"
              type="tel"
              name="telefono"
              icon={<Phone size={18} />}
              value={formData.telefono}
              onChange={handleChange}
              placeholder="33 1234 5678"
              error={errors.telefono}
              required
            />

            <Input
              label="Correo"
              type="email"
              name="correo"
              icon={<Mail size={18} />}
              value={formData.correo}
              onChange={handleChange}
              placeholder="tu@email.com"
              error={errors.correo}
              required
            />

            <Input
              label="No. Notaría"
              type="text"
              name="notaria"
              icon={<Building size={18} />}
              value={formData.notaria}
              onChange={handleChange}
              placeholder="Número de notaría"
              error={errors.notaria}
              required
            />

            <Input
              label="Municipio"
              type="text"
              name="municipio"
              icon={<MapPin size={18} />}
              value={formData.municipio}
              onChange={handleChange}
              placeholder="Nombre del municipio"
              error={errors.municipio}
              required
            />

            <Input
              label="Estado"
              type="text"
              name="estado"
              icon={<MapPin size={18} />}
              value={formData.estado}
              onChange={handleChange}
              placeholder="Nombre del estado"
              error={errors.estado}
              required
            />

            {/* Botón de envío */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full shadow-lg hover:shadow-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : (
                <>
                  Enviar a WhatsApp
                  <Send size={20} className="ml-2" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DemoForm;

