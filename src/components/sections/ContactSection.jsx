import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, User, Building, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

// Componente Button
const Button = ({ children, onClick, type = "button", variant = "primary", size = "md", className = "" }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300";
  
  const variants = {
    primary: "bg-black text-[#D8F9A0] hover:bg-gray-900 hover:shadow-lg",
    outline: "border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white",
    secondary: "bg-[#D8F9A0] text-black hover:bg-[#c9ea8f]"
  };
  
  const sizes = {
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={{ fontFamily: 'Satoshi, sans-serif' }}
    >
      {children}
    </button>
  );
};

// Componente Input
const Input = ({ label, type = "text", name, value, onChange, placeholder, required = false }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D8F9A0] focus:border-transparent transition-all duration-200"
        style={{ fontFamily: 'Satoshi, sans-serif' }}
      />
    </div>
  );
};

const ContactSection = ({ onShowDemo = () => {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación mejorada
    if (!formData.name.trim()) {
      alert('El nombre es requerido');
      return;
    }
    if (!formData.email.trim()) {
      alert('El email es requerido');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert('Por favor ingresa un email válido');
      return;
    }
    if (!formData.message.trim()) {
      alert('El mensaje es requerido');
      return;
    }
    
    console.log('Formulario enviado:', formData);
    alert('Mensaje enviado correctamente. Te contactaremos pronto.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <>
      {/* Importar fuentes */}
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Satoshi:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      <section id="contacto" className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D8F9A0] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black opacity-5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* CTA Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-[#D8F9A0] bg-opacity-20 px-4 py-2 rounded-full mb-6">
              <Sparkles size={20} className="text-[#3C3A36]" />
              <span className="text-sm font-semibold text-[#3C3A36]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                COMIENZA HOY
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
              ¿Listo para transformar{' '}
              <span className="relative inline-block">
                <span className="text-[#D8F9A0] bg-black px-4 py-2 inline-block transform -rotate-1 rounded-lg">
                  tu práctica legal?
                </span>
              </span>
            </h2>
            
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 400 }}>
              Únete a más de 500 notarías que ya confían en A Tiempo para 
              optimizar su trabajo diario. Agenda una demo y descubre cómo podemos ayudarte.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => window.open('https://wa.me/523334087070?text=Hola, me interesa conocer más sobre A Tiempo', '_blank')}
                variant="primary"
                size="xl"
                className="group shadow-xl"
              >
                <MessageSquare size={24} className="mr-2" />
                Hablar con un experto
                <ArrowRight size={24} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
              
              <Button
                onClick={onShowDemo}
                variant="outline"
                size="xl"
              >
                Agendar demo gratuita
              </Button>
            </div>

            {/* Indicadores de confianza */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Respuesta en menos de 24h</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#D8F9A0] rounded-full"></div>
                <span>Sin compromiso</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Demo personalizada</span>
              </div>
            </div>
          </div>

          {/* Línea divisoria elegante */}
          <div className="relative mb-16">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-6 py-2 bg-white text-sm font-semibold text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                O escríbenos directamente
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16">
            {/* Información de contacto */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Información de Contacto
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  Estamos listos para ayudarte a optimizar tu trabajo legal. 
                  Contáctanos y descubre cómo A Tiempo puede transformar tu práctica.
                </p>
              </div>

              {/* Equipo de contacto */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#D8F9A0] to-[#c9ea8f] rounded-full flex items-center justify-center shadow-md">
                      <User size={28} className="text-[#3C3A36]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Ángel Ramírez
                      </h4>
                      <p className="text-sm text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        CEO & Fundador
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                    <Phone size={18} className="text-[#D8F9A0]" />
                    <a 
                      href="tel:+523334087070" 
                      className="text-gray-700 hover:text-[#3C3A36] transition-colors font-medium"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      33 3408 7070
                    </a>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#A99C93] to-[#8b7f76] rounded-full flex items-center justify-center shadow-md">
                      <Building size={28} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Juan Carlos Casillas
                      </h4>
                      <p className="text-sm text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        COO & Co-fundador
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                    <Phone size={18} className="text-[#A99C93]" />
                    <a 
                      href="tel:+523311082837" 
                      className="text-gray-700 hover:text-[#3C3A36] transition-colors font-medium"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      33 1108 2837
                    </a>
                  </div>
                </div>
              </div>

              {/* Información general */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 space-y-5 border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#D8F9A0] bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-[#3C3A36]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>
                      Email
                    </p>
                    <a 
                      href="mailto:angelrmz@atiempo.mx" 
                      className="text-gray-600 hover:text-[#3C3A36] transition-colors"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      angelrmz@atiempo.mx
                    </a>
                  </div>
                </div>

                <div className="h-px bg-gray-200"></div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#D8F9A0] bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-[#3C3A36]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>
                      Ubicación
                    </p>
                    <p className="text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      Tlaquepaque, Jalisco, México
                    </p>
                  </div>
                </div>
              </div>

              {/* Horario de atención */}
              <div className="bg-black text-white rounded-2xl p-6">
                <h4 className="font-bold text-lg mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Horario de atención
                </h4>
                <div className="space-y-2 text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Lunes - Viernes</span>
                    <span className="text-[#D8F9A0] font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sábado</span>
                    <span className="text-[#D8F9A0] font-semibold">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Domingo</span>
                    <span className="text-gray-500">Cerrado</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario de contacto */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl border border-gray-100">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Envíanos un mensaje
                </h3>
                <p className="text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  Completa el formulario y nos pondremos en contacto contigo lo antes posible.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Nombre completo"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <Input
                  label="Empresa / Notaría"
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Nombre de tu empresa o notaría"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D8F9A0] focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  />
                </div>

                <form onSubmit={handleSubmit}>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full group shadow-lg"
                  >
                    Enviar mensaje
                    <Send size={20} className="ml-2 group-hover:translate-x-1 group-hover:rotate-12 transition-transform" />
                  </Button>
                </form>

                <p className="text-xs text-center text-gray-500 mt-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  Al enviar este formulario, aceptas nuestra política de privacidad y tratamiento de datos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;