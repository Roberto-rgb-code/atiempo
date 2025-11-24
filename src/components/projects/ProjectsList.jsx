import React, { useState } from 'react';
import { FolderOpen, Calendar, User, MapPin, FileText, Trash2, Edit } from 'lucide-react';

// Datos de ejemplo
const SAMPLE_PROJECTS = [
  {
    id: 1,
    title: 'Compraventa de Inmueble',
    escritura: '12345',
    client: 'Juan Pérez García',
    date: '2024-11-20',
    notary: 'Notaría Pública No. 5',
    location: 'Guadalajara, Jalisco',
    status: 'En proceso'
  },
  {
    id: 2,
    title: 'Constitución de Sociedad',
    escritura: '12346',
    client: 'María López Hernández',
    date: '2024-11-18',
    notary: 'Notaría Pública No. 12',
    location: 'Ciudad de México',
    status: 'Completado'
  },
  {
    id: 3,
    title: 'Poder Notarial',
    escritura: '12347',
    client: 'Carlos Rodríguez Sánchez',
    date: '2024-11-15',
    notary: 'Notaría Pública No. 8',
    location: 'Monterrey, Nuevo León',
    status: 'Pendiente'
  },
];

export default function ProjectsList() {
  const [projects, setProjects] = useState(SAMPLE_PROJECTS);

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'En proceso':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FolderOpen className="w-8 h-8 text-[#D8F9A0]" />
          <h1 className="text-3xl font-bold text-gray-900">Proyectos</h1>
        </div>
        <p className="text-gray-600">Lista de todas las escrituras registradas</p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border p-5">
          <div className="text-sm text-gray-500 mb-1">Total de Proyectos</div>
          <div className="text-3xl font-bold text-gray-900">{projects.length}</div>
        </div>
        <div className="bg-white rounded-xl border p-5">
          <div className="text-sm text-gray-500 mb-1">En Proceso</div>
          <div className="text-3xl font-bold text-blue-600">
            {projects.filter(p => p.status === 'En proceso').length}
          </div>
        </div>
        <div className="bg-white rounded-xl border p-5">
          <div className="text-sm text-gray-500 mb-1">Completados</div>
          <div className="text-3xl font-bold text-green-600">
            {projects.filter(p => p.status === 'Completado').length}
          </div>
        </div>
      </div>

      {/* Lista de proyectos */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl border p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                  <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>Escritura No. {project.escritura}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => alert('Editar: ' + project.title)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <User className="w-4 h-4 text-gray-400" />
                <span>{project.client}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{new Date(project.date).toLocaleDateString('es-MX')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{project.location}</span>
              </div>
            </div>

            {project.notary && (
              <div className="mt-3 pt-3 border-t text-sm text-gray-600">
                <span className="font-medium">Notaría:</span> {project.notary}
              </div>
            )}
          </div>
        ))}

        {projects.length === 0 && (
          <div className="bg-white rounded-xl border p-12 text-center">
            <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay proyectos</h3>
            <p className="text-gray-600">Crea tu primer proyecto para comenzar</p>
          </div>
        )}
      </div>
    </div>
  );
}

