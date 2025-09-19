// src/routes/PublicOnlyRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function PublicOnlyRoute() {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div className="p-8 text-center">Cargando…</div>;
  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
