import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button } from '../../components/Button/Button'; // Importamos el componente Button
import { Navigate, useNavigate, Link } from "react-router-dom";
import axios from 'axios';

export const Register = () => {
  const navigate = useNavigate();

  //Validacion con formik
  const validate = async (values) =>{
    const errors = {};

    if (!values.username){
      errors.username = 'Requerido';
    }

    if (!values.email){
      errors.email = 'Requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      errors.email = 'Dirección de correo electrónico invalida';
    } else {
      try {
        const response = await axios.get('http://localhost:8000/check-email/', {
          params: { email: values.email },
        });
        if (response.data.exists) {
          errors.email = 'El email ya está registrado';
        }
      } catch (error) {
        console.error('Error verificando el email:', error);
      }
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
        const response = await axios.post('http://localhost:8000/register/', values, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        console.log(response.data); // Maneja la respuesta
  
        navigate('/login');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });

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
              <div className='text-[#D39790]'>{formik.errors.username}</div>
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
              <div className='text-[#D39790]'>{formik.errors.email}</div>
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
              <div className="text-[#D39790]">{formik.errors.password}</div>
            ) : null}
          </div>
          {/* Centramos el botón */}
          <div className="flex justify-center">
            <Button text="Registrarse" /*onClick={handleSubmit}*/ />
          </div>

          <div className='mt-5 text-center'>
            <p className='text-white'>¿Ya tienes una cuenta?<Link to={'/login'} className='text-lime-400'> Inicia sesión aquí</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};