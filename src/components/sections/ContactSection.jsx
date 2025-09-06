import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, User, Building } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const ContactSection = () => {
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
    console.log('Formulario enviado:', formData);
    alert('Mensaje enviado correctamente. Te contactaremos pronto.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <section id="contacto" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Contáctanos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ¿Listo para transformar tu práctica legal? Nuestro equipo está aquí 
            para ayudarte a dar el siguiente paso hacia la eficiencia.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Información de contacto */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Información de Contacto
              </h3>
              <p className="text-gray-600 mb-8">
                Estamos listos para ayudarte a optimizar tu trabajo legal. 
                Contáctanos y descubre cómo A Tiempo puede transformar tu práctica.
              </p>
            </div>

            {/* Equipo de contacto */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#D8F9A0] rounded-full flex items-center justify-center">
                    <User size={24} className="text-[#3C3A36]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Ángel Ramírez</h4>
                    <p className="text-sm text-gray-600">CEO</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  <Phone size={16} className="text-[#D8F9A0]" />
                  <a 
                    href="tel:+523334087070" 
                    className="text-gray-700 hover:text-[#3C3A36] transition-colors"
                  >
                    33 3408 7070
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#A99C93] rounded-full flex items-center justify-center">
                    <Building size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Juan Carlos Casillas</h4>
                    <p className="text-sm text-gray-600">COO</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  <Phone size={16} className="text-[#A99C93]" />
                  <a 
                    href="tel:+523311082837" 
                    className="text-gray-700 hover:text-[#3C3A36] transition-colors"
                  >
                    33 1108 2837
                  </a>
                </div>
              </div>
            </div>

            {/* Información general */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-[#D8F9A0]" />
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <a 
                    href="mailto:angelrmz@atiempo.mx" 
                    className="text-gray-600 hover:text-[#3C3A36] transition-colors"
                  >
                    angelrmz@atiempo.mx
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin size={20} className="text-[#D8F9A0]" />
                <div>
                  <p className="font-semibold text-gray-900">Ubicación</p>
                  <p className="text-gray-600">Tlaquepaque, Jalisco, México</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Envíanos un mensaje
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D8F9A0] focus:border-transparent transition-all duration-200"
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full group"
              >
                Enviar mensaje
                <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;