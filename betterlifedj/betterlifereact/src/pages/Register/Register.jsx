import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button } from '../../components/Button/Button'; // Importamos el componente Button
import { Navigate, useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

  //Validacion con formik
  const validate = values =>{
    const errors = {};
    if (!values.username){
      errors.username = 'Requerido';
    }
    if (!values.email){
      errors.email = 'Requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      errors.email = 'Dirección de correo electrónico invalida';
    }
    if(!values.password){
      errors.password = 'Requerido';
    }
    return errors;
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    validate,
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:8000/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Error en el registro');
        }

        const result = await response.json();
        console.log(result);

        navigate('/login');
      } catch (error) {
        console.error('Error:', error);
      }

    }
  });

  /*const [formData, setFormData] = useState({
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
  

      if (!response.ok) {
        throw new Error('Error en el registro');
      }
  
      const result = await response.json();
      console.log(result);

      navigate('/login');

    } catch (error) {
      console.error('Error:', error);
    }
  };*/

  return (
    <div className="font-Nunito min-h-screen flex items-center justify-center">
      <div className="bg-lime-700 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl uppercase text-center mb-6 text-white">Registro</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-100 font-medium mb-2">Nombre de usuario</label>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              //required
              className="bg-lime-700 w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-lime-900 text-white transition-all duration-300 ease-in-out focus:border-b-lime-900"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className='text-red-500'>{formik.errors.username}</div>
            ): null}
          </div>
          <div className="mb-4">
            <label className="block text-gray-100 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              //required
              className="bg-lime-700 w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-lime-900 text-white transition-all duration-300 ease-in-out focus:border-b-lime-900"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='text-red-500'>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-6">
            <label className="block text-gray-100 font-medium mb-2">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              //required
              className="bg-lime-700 w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-lime-900 text-white transition-all duration-300 ease-in-out focus:border-b-lime-900"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>
          {/* Centramos el botón */}
          <div className="flex justify-center">
            <Button text="Registrarse" /*onClick={handleSubmit}*/ />
          </div>
        </form>
      </div>
    </div>
  );
};