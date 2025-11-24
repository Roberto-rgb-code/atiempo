import React, { useState } from 'react';
import { Eye, Download, Share2, Printer, FileText } from 'lucide-react';

const SAMPLE_PROJECTS = [
  {
    id: 1,
    title: 'Compraventa de Inmueble',
    escritura: '12345',
    client: 'Juan Pérez García',
    date: '2024-11-20',
    description: 'Escritura de compraventa de propiedad ubicada en Av. Principal #123',
  },
  {
    id: 2,
    title: 'Constitución de Sociedad',
    escritura: '12346',
    client: 'María López Hernández',
    date: '2024-11-18',
    description: 'Constitución de sociedad anónima para empresa tecnológica',
  },
];

export default function ViewProjects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleView = (project) => {
    setSelectedProject(project);
  };

  const handleDownload = (project) => {
    alert(`Descargando escritura ${project.escritura}...`);
  };

  const handlePrint = (project) => {
    alert(`Imprimiendo escritura ${project.escritura}...`);
  };

  const handleShare = (project) => {
    alert(`Compartiendo escritura ${project.escritura}...`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Eye className="w-8 h-8 text-[#D8F9A0]" />
          <h1 className="text-3xl font-bold text-gray-900">Visualizar Proyectos</h1>
        </div>
        <p className="text-gray-600">Consulta y gestiona los documentos de las escrituras</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Lista de proyectos */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Selecciona un proyecto</h2>
          {SAMPLE_PROJECTS.map((project) => (
            <button
              key={project.id}
              onClick={() => handleView(project)}
              className={`w-full text-left p-5 rounded-xl border transition-all ${
                selectedProject?.id === project.id
                  ? 'bg-[#D8F9A0] border-[#D8F9A0] shadow-md'
                  : 'bg-white hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{project.title}</h3>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                  #{project.escritura}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{project.client}</p>
              <p className="text-xs text-gray-500">
                {new Date(project.date).toLocaleDateString('es-MX', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </button>
          ))}
        </div>

        {/* Detalles del proyecto seleccionado */}
        <div>
          {selectedProject ? (
            <div className="bg-white rounded-xl border p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedProject.title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText className="w-4 h-4" />
                    <span>Escritura No. {selectedProject.escritura}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Cliente</label>
                  <p className="text-gray-900 mt-1">{selectedProject.client}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Fecha</label>
                  <p className="text-gray-900 mt-1">
                    {new Date(selectedProject.date).toLocaleDateString('es-MX', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Descripción</label>
                  <p className="text-gray-900 mt-1">{selectedProject.description}</p>
                </div>
              </div>

              {/* Acciones */}
              <div className="pt-6 border-t">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Acciones</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleDownload(selectedProject)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Descargar
                  </button>
                  <button
                    onClick={() => handlePrint(selectedProject)}
                    className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    Imprimir
                  </button>
                  <button
                    onClick={() => handleShare(selectedProject)}
                    className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors col-span-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Compartir
                  </button>
                </div>
              </div>

              {/* Vista previa del documento */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Vista previa</h3>
                <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">
                    Aquí se mostraría la vista previa del documento
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border p-12 text-center">
              <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Selecciona un proyecto
              </h3>
              <p className="text-gray-600">
                Elige un proyecto de la lista para ver sus detalles
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

