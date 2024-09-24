import React, { useState } from 'react';
import { Button } from '../../components/Button/Button'; // Importamos el componente Button
import { Navigate, useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };
  
    try {
      const response = await fetch('http://localhost:8000/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      navigate('/');

      if (!response.ok) {
        throw new Error('Error en el registro');
      }
  
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="font-Nunito min-h-screen flex items-center justify-center">
      <div className="bg-lime-700 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl uppercase text-center mb-6 text-white">Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-100 font-medium mb-2">Nombre de usuario</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="bg-lime-700 w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-lime-900 text-white transition-all duration-300 ease-in-out focus:border-b-lime-900"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-100 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-lime-700 w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-lime-900 text-white transition-all duration-300 ease-in-out focus:border-b-lime-900"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-100 font-medium mb-2">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-lime-700 w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-lime-900 text-white transition-all duration-300 ease-in-out focus:border-b-lime-900"
            />
          </div>
          {/* Centramos el botón */}
          <div className="flex justify-center">
            <Button text="Registrarse" onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
};