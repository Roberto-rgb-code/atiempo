import React from 'react';

const AboutSection = () => {
  return (
    <section id="acerca" className="py-20 bg-[#E6DCD0]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Logo vertical */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative group">
              <div className="bg-white rounded-2xl p-12 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <img 
                  src="/logo-vertical.jpg" 
                  alt="A Tiempo Software Legal" 
                  className="h-80 lg:h-96 w-auto mx-auto"
                />
              </div>
              {/* Elementos decorativos mejorados */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#D8F9A0] rounded-full opacity-80 animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-[#3C3A36] rounded-full opacity-60"></div>
              <div className="absolute top-1/2 -right-6 w-4 h-4 bg-[#A99C93] rounded-full opacity-40"></div>
            </div>
          </div>

          {/* Contenido */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-[#D8F9A0] text-[#3C3A36] px-4 py-2 rounded-full text-sm font-semibold">
                  Nuestra Historia
                </span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-[#3C3A36] leading-tight">
                En un mundo legal que aún se pierde en lo burocrático
              </h2>
              
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Nace <strong className="text-[#3C3A36]">A Tiempo</strong> como una solución real, concreta y eficaz. 
                  Creemos que el trabajo jurídico no tiene por qué ser lento ni tedioso.
                </p>
                
                <p>
                  Creemos en liberar el potencial estratégico de los abogados, 
                  devolviéndoles el recurso más valioso que tienen: <strong className="text-[#3C3A36]">el tiempo</strong>.
                </p>
                
                <p>
                  Nuestra misión no es solo tecnológica, es profundamente humana. 
                  Porque cada minuto que ganamos, es un minuto que se puede dedicar 
                  a pensar, a prevenir, a construir.
                </p>
              </div>
            </div>

            {/* Misión y Visión mejoradas */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-[#D8F9A0] rounded-lg flex items-center justify-center mr-3">
                    <span className="text-[#3C3A36] font-bold text-sm">M</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#3C3A36]">Misión</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Facilitar la labor legal a través de una herramienta intuitiva, 
                  eficiente y confiable que automatiza la creación de formatos 
                  notariales y contractuales.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-[#A99C93] rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">V</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#3C3A36]">Visión</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Convertirnos en el software legal de referencia en notarías 
                  y despachos jurídicos de toda la República.
                </p>
              </div>
            </div>

            {/* Quote destacado mejorado */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#D8F9A0] to-[#A99C93] rounded-full"></div>
              <div className="pl-6">
                <p className="text-xl italic text-[#3C3A36] font-medium leading-relaxed">
                  "El futuro del derecho no está en la repetición, está en la evolución."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;