import React, { useState } from 'react';
import { Save, FileText, Calendar, User } from 'lucide-react';

export default function CreateProject() {
  const [formData, setFormData] = useState({
    title: '',
    escritura: '',
    client: '',
    date: '',
    description: '',
    notary: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nuevo proyecto/escritura:', formData);
    // Aquí conectarías con tu backend/Firebase
    alert('Proyecto creado exitosamente');
    // Resetear formulario
    setFormData({
      title: '',
      escritura: '',
      client: '',
      date: '',
      description: '',
      notary: '',
      location: ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FileText className="w-8 h-8 text-[#D8F9A0]" />
          <h1 className="text-3xl font-bold text-gray-900">Crear Proyecto</h1>
        </div>
        <p className="text-gray-600">Complete la información de la escritura</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border p-8 space-y-6">
        {/* Título del Proyecto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título del Proyecto *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Ej: Compraventa de inmueble"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D8F9A0] focus:border-transparent"
          />
        </div>

        {/* Número de Escritura */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número de Escritura *
            </label>
            <input
              type="text"
              name="escritura"
              value={formData.escritura}
              onChange={handleChange}
              required
              placeholder="Ej: 12345"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D8F9A0] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D8F9A0] focus:border-transparent"
            />
          </div>
        </div>

        {/* Cliente */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cliente *
          </label>
          <input
            type="text"
            name="client"
            value={formData.client}
            onChange={handleChange}
            required
            placeholder="Nombre completo del cliente"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D8F9A0] focus:border-transparent"
          />
        </div>

        {/* Notaría y Ubicación */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notaría
            </label>
            <input
              type="text"
              name="notary"
              value={formData.notary}
              onChange={handleChange}
              placeholder="Nombre de la notaría"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D8F9A0] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ubicación
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Ciudad, Estado"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D8F9A0] focus:border-transparent"
            />
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción / Notas
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Detalles adicionales sobre la escritura..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D8F9A0] focus:border-transparent resize-none"
          />
        </div>

        {/* Botón Submit */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => setFormData({
              title: '',
              escritura: '',
              client: '',
              date: '',
              description: '',
              notary: '',
              location: ''
            })}
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-900 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Guardar Proyecto
          </button>
        </div>
      </form>
    </div>
  );
}

