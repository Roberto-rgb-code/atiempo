import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogOut } from 'lucide-react';

// Layout
import Sidebar from '../components/layout/Sidebar';

// Vistas de proyectos
import CreateProject from '../components/projects/CreateProject';
import ProjectsList from '../components/projects/ProjectsList';
import ViewProjects from '../components/projects/ViewProjects';
import SearchProjects from '../components/projects/SearchProjects';

export default function MainApp() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('create');

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  const renderView = () => {
    switch (activeView) {
      case 'create':
        return <CreateProject />;
      case 'projects':
        return <ProjectsList />;
      case 'view':
        return <ViewProjects />;
      case 'search':
        return <SearchProjects />;
      default:
        return <CreateProject />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Bienvenido{user?.displayName ? `, ${user.displayName}` : ''}
              </h2>
              <p className="text-sm text-gray-600">
                {user?.email}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

