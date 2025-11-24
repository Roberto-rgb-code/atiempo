import React from 'react';
import { FileText, FolderOpen, Eye, Search, Home } from 'lucide-react';

export default function Sidebar({ activeView, onViewChange }) {
  const menuItems = [
    { id: 'create', label: 'Crear Proyecto', icon: FileText },
    { id: 'projects', label: 'Proyectos', icon: FolderOpen },
    { id: 'view', label: 'Visualizar Proyectos', icon: Eye },
    { id: 'search', label: 'Buscar', icon: Search },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-bold">Sistema de Escrituras</h2>
        <p className="text-sm text-gray-400 mt-1">Gestión de Proyectos</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#D8F9A0] text-gray-900 font-medium'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-400">
          <p>Sistema A Tiempo</p>
          <p className="mt-1">© 2025 Todos los derechos reservados</p>
        </div>
      </div>
    </aside>
  );
}

