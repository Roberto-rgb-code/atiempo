import React, { useState } from 'react';
import { Check } from 'lucide-react';

// Componente Button
const Button = ({ children, onClick, variant = "primary", size = "md", className = "" }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300";
  
  const variants = {
    primary: "bg-black text-[#D8F9A0] hover:bg-gray-900",
    outline: "border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white",
    accent: "bg-[#D8F9A0] text-black hover:bg-[#c9ea8f]"
  };
  
  const sizes = {
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={{ fontFamily: 'Satoshi, sans-serif' }}
    >
      {children}
    </button>
  );
};

const PricingSection = ({ onShowAuth = () => {} }) => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' o 'annual'

  const plans = [
    {
      name: 'Bamboo - Gratuita',
      priceMonthly: '$0',
      priceAnnual: '$0',
      period: '',
      description: 'Uso de plataforma limitado',
      features: [
        'Acceso básico',
        'Costo por producto',
        'Sin accesorios',
        'Sin soporte',
        'Sin formato de identidad',
        'Exportación en PDF'
      ],
      cta: 'Crear cuenta gratis',
      popular: false,
      showIVA: false
    },
    {
      name: 'Advance Mediana',
      priceMonthly: '$2,000',
      priceAnnual: '$20,000',
      savingsAnnual: '$4,000',
      period: 'mes',
      description: '3 usuarios por notaría',
      features: [
        'Almacenamiento limitado a folios',
        '100 folios / Accesorios instalados',
        'Soporte ilimitado',
        'Formato identidad de notaría',
        'PDF (con opción de escalar a Word)'
      ],
      cta: 'Comenzar',
      popular: true,
      showIVA: true
    },
    {
      name: 'In-Time Grandes',
      priceMonthly: '$3,500',
      priceAnnual: '$35,000',
      savingsAnnual: '$7,000',
      period: 'mes',
      description: '10 usuarios por notaría',
      features: [
        'Almacenamiento ilimitado',
        '250 folios / Accesorios instalados',
        'Soporte ilimitado',
        'Formato identidad de notaría',
        'PDF y Word',
        'Acceso beta a nuevos productos'
      ],
      cta: 'Hablar con ventas',
      popular: false,
      showIVA: true
    }
  ];

  const wordFolioCost = {
    note: 'Costo por folio de Word (mínimo 30 folios)',
    price: '$20.00'
  };

  const productCosts = [
    { name: 'Testimonio', price: 150 },
    { name: 'Copia Certificada', price: 150 },
    { name: 'Transmisión', price: 100 },
    { name: 'Plano', price: 85 },
    { name: 'Portada', price: 70 }
  ];

  // Función para generar mensaje personalizado de WhatsApp según el plan
  const handlePlanClick = (plan) => {
    const currentPrice = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceAnnual;
    const displayPeriod = billingCycle === 'monthly' ? plan.period : 'año';
    const periodText = displayPeriod ? `/${displayPeriod}` : '';
    const ivaText = plan.showIVA ? ' + IVA' : '';
    const facturacionText = billingCycle === 'monthly' ? 'mensual' : 'anual';
    
    // Si es el plan gratuito, abrir modal de registro
    if (plan.name === 'Bamboo - Gratuita') {
      onShowAuth('register');
      return;
    }

    // Crear mensaje personalizado para WhatsApp
    const mensaje = `¡Hola! Me interesa el plan *${plan.name}* de A Tiempo.

💰 *Información del Plan:*
• Plan: ${plan.name}
• Precio: ${currentPrice}${periodText}${ivaText}
• Facturación: ${facturacionText}
• Descripción: ${plan.description}

✨ *Características incluidas:*
${plan.features.map(feature => `• ${feature}`).join('\n')}

${billingCycle === 'annual' && plan.savingsAnnual ? `\n💵 *Ahorro anual:* ${plan.savingsAnnual}` : ''}

Me gustaría obtener más información y proceder con la contratación.`;

    // Codificar el mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    // Abrir WhatsApp con el mensaje
    const whatsappUrl = `https://wa.me/523334087070?text=${mensajeCodificado}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Importar fuentes */}
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Satoshi:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      <section id="precios" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Planes y costos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 400 }}>
              Elige el plan que se ajusta a tu notaría y escala a tu ritmo.
            </p>

            {/* Toggle de facturación */}
            <div className="inline-flex items-center bg-white rounded-full p-1.5 shadow-lg border-2 border-gray-200">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-black text-[#D8F9A0] shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Mensual
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 relative ${
                  billingCycle === 'annual'
                    ? 'bg-black text-[#D8F9A0] shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Anual
                <span className="absolute -top-2 -right-2 bg-[#D8F9A0] text-black text-xs font-bold px-2 py-0.5 rounded-full">
                  -17%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {plans.map((plan, index) => {
              const currentPrice = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceAnnual;
              const displayPeriod = billingCycle === 'monthly' ? plan.period : 'año';
              
              return (
                <div
                  key={index}
                  className={`relative rounded-2xl p-8 transition-all duration-300 ${
                    plan.popular
                      ? 'bg-black text-white ring-4 ring-[#D8F9A0] transform scale-105'
                      : 'bg-white border border-gray-200 hover:shadow-xl'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-[#D8F9A0] text-black px-4 py-1 rounded-full text-sm font-semibold" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        Más Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3
                      className={`text-2xl font-bold mb-2 ${
                        plan.popular ? 'text-white' : 'text-gray-900'
                      }`}
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`mb-4 ${
                        plan.popular ? 'text-gray-300' : 'text-gray-600'
                      }`}
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      {plan.description}
                    </p>
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-end">
                        <span
                          className={`text-4xl font-bold ${
                            plan.popular ? 'text-white' : 'text-gray-900'
                          }`}
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                          {currentPrice}
                        </span>
                        {displayPeriod && (
                          <span
                            className={`ml-2 ${
                              plan.popular ? 'text-gray-300' : 'text-gray-600'
                            }`}
                            style={{ fontFamily: 'Satoshi, sans-serif' }}
                          >
                            /{displayPeriod}
                          </span>
                        )}
                      </div>
                      {plan.showIVA && (
                        <span
                          className={`text-sm mt-1 ${
                            plan.popular ? 'text-gray-400' : 'text-gray-500'
                          }`}
                          style={{ fontFamily: 'Satoshi, sans-serif' }}
                        >
                          + IVA
                        </span>
                      )}
                      {billingCycle === 'annual' && plan.savingsAnnual && (
                        <span
                          className={`text-sm mt-2 font-semibold ${
                            plan.popular ? 'text-[#D8F9A0]' : 'text-green-600'
                          }`}
                          style={{ fontFamily: 'Satoshi, sans-serif' }}
                        >
                          Ahorras {plan.savingsAnnual} al año
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check
                          size={20}
                          className={`mr-3 mt-0.5 flex-shrink-0 ${
                            plan.popular ? 'text-[#D8F9A0]' : 'text-green-500'
                          }`}
                        />
                        <span
                          className={plan.popular ? 'text-gray-300' : 'text-gray-700'}
                          style={{ fontFamily: 'Satoshi, sans-serif' }}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handlePlanClick(plan)}
                    variant={plan.popular ? 'accent' : 'outline'}
                    size="lg"
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Word folio cost */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div>
                <p className="text-sm uppercase tracking-wide text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>
                  Adicional
                </p>
                <p className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  {wordFolioCost.note}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {wordFolioCost.price}
                </div>
                <span className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  + IVA
                </span>
              </div>
            </div>
          </div>

          {/* Product costs */}
          <div className="max-w-4xl mx-auto mt-10 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Costo por producto
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {productCosts.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3 hover:border-[#D8F9A0] transition-colors duration-200"
                >
                  <span className="text-gray-700" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {p.name}
                  </span>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>
                      ${p.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-500 ml-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      + IVA
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom text */}
          <div className="text-center mt-16">
            <p className="text-gray-600 mb-2" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 400 }}>
              Puedes iniciar en el plan gratuito y actualizar cuando lo necesites.
            </p>
            <p className="text-sm text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              Sin compromisos. Cancela cuando quieras.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingSection;