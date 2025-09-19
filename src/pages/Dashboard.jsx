import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  LogOut, Search, ArrowUpDown, BadgeDollarSign, CheckCircle2
} from 'lucide-react';

const MX = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

const RAW_PRODUCTS = [
  { id: 'p1', name: 'Testimonio',         price: 150.00 },
  { id: 'p2', name: 'Copia Certificada',  price: 150.00 },
  { id: 'p3', name: 'Transmisión',        price: 100.00 },
  { id: 'p4', name: 'Plano',              price:  85.00 },
  { id: 'p5', name: 'Portada',            price:  70.00 },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [lastRequested, setLastRequested] = useState(null); // para feedback visual

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? RAW_PRODUCTS.filter(p => p.name.toLowerCase().includes(q))
      : RAW_PRODUCTS.slice();
    list.sort((a, b) => sortAsc ? a.price - b.price : b.price - a.price);
    return list;
  }, [query, sortAsc]);

  const total = useMemo(
    () => filtered.reduce((acc, p) => acc + p.price, 0),
    [filtered]
  );

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  const requestItem = (p) => {
    // Aquí podrías lanzar un flujo de pedido real o abrir un modal
    setLastRequested(p.id);
    setTimeout(() => setLastRequested(null), 1500);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Encabezado */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Bienvenido{user?.displayName ? `, ${user.displayName}` : ''}. Aquí puedes consultar el <strong>costo por producto</strong>.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4 h-10 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>

      {/* Resumen rápido */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="rounded-2xl border bg-white p-5">
          <div className="flex items-center gap-3">
            <BadgeDollarSign className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-500">Productos disponibles</span>
          </div>
          <div className="mt-2 text-2xl font-semibold">{RAW_PRODUCTS.length}</div>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <div className="flex items-center gap-3">
            <ArrowUpDown className="w-5 h-5 text-indigo-600" />
            <span className="text-sm text-gray-500">Rango de precios</span>
          </div>
          <div className="mt-2 text-sm text-gray-700">
            {MX.format(Math.min(...RAW_PRODUCTS.map(p => p.price)))} — {MX.format(Math.max(...RAW_PRODUCTS.map(p => p.price)))}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 lg:col-span-1 sm:col-span-2">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-teal-600" />
            <span className="text-sm text-gray-500">Total (lista filtrada)</span>
          </div>
          <div className="mt-2 text-2xl font-semibold">{MX.format(total)}</div>
        </div>
      </div>

      {/* Controles */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar producto…"
            className="w-full pl-9 pr-3 h-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D8F9A0] focus:border-transparent"
          />
        </div>

        <button
          onClick={() => setSortAsc(v => !v)}
          className="inline-flex items-center gap-2 px-4 h-10 rounded-lg border bg-white hover:bg-gray-50"
        >
          <ArrowUpDown className="w-4 h-4" />
          Ordenar por precio: <span className="font-medium">{sortAsc ? 'Asc' : 'Desc'}</span>
        </button>
      </div>

      {/* Tabla de productos */}
      <div className="mt-5 overflow-hidden rounded-2xl border bg-white">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm">
              <th className="px-5 py-3 font-medium">Producto</th>
              <th className="px-5 py-3 font-medium w-40">Precio</th>
              <th className="px-5 py-3 font-medium w-40 text-right">Acción</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, idx) => (
              <tr key={p.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                <td className="px-5 py-4">
                  <div className="font-medium text-gray-900">{p.name}</div>
                </td>
                <td className="px-5 py-4">
                  <div className="text-gray-800">{MX.format(p.price)}</div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end">
                    <button
                      onClick={() => requestItem(p)}
                      className={`inline-flex items-center gap-2 px-3 h-9 rounded-lg transition-colors
                        ${lastRequested === p.id
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-black text-white hover:bg-gray-900'}
                      `}
                    >
                      {lastRequested === p.id ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Solicitado
                        </>
                      ) : (
                        <>Solicitar</>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="3" className="px-5 py-10 text-center text-gray-500">
                  No se encontraron productos para “{query}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Nota / Ayuda */}
      <p className="text-xs text-gray-500 mt-4">
        Los precios mostrados son orientativos. Impuestos y gastos adicionales pueden aplicar según el trámite.
      </p>
    </div>
  );
}
