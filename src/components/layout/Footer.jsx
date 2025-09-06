import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#3C3A36] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Nombre de empresa y descripción */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="text-3xl font-bold text-[#D8F9A0]">)(</div>
              <div>
                <h3 className="text-2xl font-bold text-white">A Tiempo</h3>
                <p className="text-gray-300 -mt-1">Software Legal</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-sm">
              Simplificando la redacción notarial con un software intuitivo 
              que ofrece eficiencia y simplicidad.
            </p>
            <div className="text-sm text-gray-400">
              © 2025 A Tiempo Software Legal
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-gray-300 hover:text-[#D8F9A0] transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#acerca" className="text-gray-300 hover:text-[#D8F9A0] transition-colors">
                  Acerca de
                </a>
              </li>
              <li>
                <a href="#caracteristicas" className="text-gray-300 hover:text-[#D8F9A0] transition-colors">
                  Características
                </a>
              </li>
              <li>
                <a href="#precios" className="text-gray-300 hover:text-[#D8F9A0] transition-colors">
                  Precios
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#D8F9A0] transition-colors">
                  Documentación
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#D8F9A0] transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-[#D8F9A0] transition-colors">
                  Centro de Ayuda
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#D8F9A0] transition-colors">
                  Tutoriales
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#D8F9A0] transition-colors">
                  Estado del Servicio
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#D8F9A0] transition-colors">
                  Términos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#D8F9A0] transition-colors">
                  Privacidad
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div id="contacto">
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone size={18} className="mt-0.5 text-[#D8F9A0]" />
                <div>
                  <div className="text-sm text-gray-300">+52 33 6778 8990</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail size={18} className="mt-0.5 text-[#D8F9A0]" />
                <div>
                  <div className="text-sm text-gray-300">angelrmz@atiempo.mx</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Globe size={18} className="mt-0.5 text-[#D8F9A0]" />
                <div>
                  <div className="text-sm text-gray-300">atiempo.com.mx</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="mt-0.5 text-[#D8F9A0]" />
                <div>
                  <div className="text-sm text-gray-300">
                    Tlaquepaque, Jalisco<br />
                    México
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 A Tiempo Software Legal. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;