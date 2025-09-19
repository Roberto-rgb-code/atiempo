// src/pages/RegisterPage.jsx
import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-[70vh] grid place-items-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Crear cuenta</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
