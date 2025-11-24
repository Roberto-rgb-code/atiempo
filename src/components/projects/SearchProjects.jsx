import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, User, FileText, X } from 'lucide-react';

const ALL_PROJECTS = [
  {
    id: 1,
    title: 'Compraventa de Inmueble',
    escritura: '12345',
    client: 'Juan Pérez García',
    date: '2024-11-20',
    location: 'Guadalajara, Jalisco',
    status: 'En proceso'
  },
  {
    id: 2,
    title: 'Constitución de Sociedad',
    escritura: '12346',
    client: 'María López Hernández',
    date: '2024-11-18',
    location: 'Ciudad de México',
    status: 'Completado'
  },
  {
    id: 3,
    title: 'Poder Notarial',
    escritura: '12347',
    client: 'Carlos Rodríguez Sánchez',
    date: '2024-11-15',
    location: 'Monterrey, Nuevo León',
    status: 'Pendiente'
  },
  {
    id: 4,
    title: 'Testamento',
    escritura: '12348',
    client: 'Ana Martínez Gómez',
    date: '2024-11-10',
    location: 'Guadalajara, Jalisco',
    status: 'Completado'
  },
  {
    id: 5,
    title: 'Hipoteca',
    escritura: '12349',
    client: 'Roberto Sánchez Torres',
    date: '2024-11-05',
    location: 'Puebla, Puebla',
    status: 'En proceso'
  },
];

export default function SearchProjects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProjects = useMemo(() => {
    let results = ALL_PROJECTS;

    // Filtrar por término de búsqueda
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (project) =>
          project.title.toLowerCase().includes(term) ||
          project.client.toLowerCase().includes(term) ||
          project.escritura.includes(term) ||
          project.location.toLowerCase().includes(term)
      );
    }

    // Filtrar por estado
    if (filterStatus !== 'all') {
      results = results.filter((project) => project.status === filterStatus);
    }

    return results;
  }, [searchTerm, filterStatus]);

  const clearFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Search className="w-8 h-8 text-[#D8F9A0]" />
          <h1 className="text-3xl font-bold text-gray-900">Buscar Proyectos</h1>
        </div>
        <p className="text-gray-600">Encuentra escrituras por título, cliente, número o ubicación</p>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="bg-white rounded-xl border p-6 mb-8">
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por título, cliente, escritura o ubicación..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D8F9A0] focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Filter className="w-5 h-5" />
            Filtros
          </button>
        </div>

        {/* Filtros expandibles */}
        {showFilters && (
          <div className="pt-4 border-t">
            <div className="flex items-center gap-3 mb-3">
              <label className="text-sm font-medium text-gray-700">Estado:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D8F9A0]"
              >
                <option value="all">Todos</option>
                <option value="Completado">Completado</option>
                <option value="En proceso">En proceso</option>
                <option value="Pendiente">Pendiente</option>
              </select>
              {(searchTerm || filterStatus !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="ml-auto px-4 py-2 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>
        )}

        {/* Resultados contador */}
        <div className="mt-4 text-sm text-gray-600">
          Se encontraron <span className="font-semibold text-gray-900">{filteredProjects.length}</span> resultado(s)
        </div>
      </div>

      {/* Resultados */}
      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl border p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Escritura No. {project.escritura}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{project.client}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(project.date).toLocaleDateString('es-MX')}</span>
                  </div>
                </div>
              </div>
              <span
                className={`text-xs px-3 py-1 rounded-full border ${
                  project.status === 'Completado'
                    ? 'bg-green-100 text-green-800 border-green-200'
                    : project.status === 'En proceso'
                    ? 'bg-blue-100 text-blue-800 border-blue-200'
                    : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                }`}
              >
                {project.status}
              </span>
            </div>
            <div className="text-sm text-gray-500">{project.location}</div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="bg-white rounded-xl border p-12 text-center">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron resultados</h3>
            <p className="text-gray-600 mb-4">
              Intenta con otros términos de búsqueda o ajusta los filtros
            </p>
            {(searchTerm || filterStatus !== 'all') && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

