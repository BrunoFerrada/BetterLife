import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import style from "./Login.module.css";
import { Button } from "../../components";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', {
                username: username,
                password: password
            });

            const { access, refresh } = response.data;

            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            // Cambiar por una redirección a la home page
            navigate('/home');
            //console.log('Login exitoso');

            // Aquí podrías usar el hook useNavigate de react-router-dom para redirigir
            // navigate('/home');  // Asegúrate de importar y usar el hook useNavigate
        } catch (err) {
            setError('Nombre de usuario o contraseña incorrectos');
        }
    };


    return (
        <div className="font-Nunito min-h-screen flex items-center justify-center">
            <div className="bg-lime-700 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl uppercase text-center mb-6 text-white">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-4">
                            <label className="block text-gray-100 font-medium mb-2">Nombre de usuario: </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="bg-lime-700 w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-lime-900 text-white transition-all duration-300 ease-in-out focus:border-b-lime-900"
                            />
                        </div>
                        <div className="mb-4">
                            <label  className="block text-gray-100 font-medium mb-2">Contraseña: </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-lime-700 w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-lime-900 text-white transition-all duration-300 ease-in-out focus:border-b-lime-900"
                            />
                        </div>
                    </div>    
                    <div className={style.button_container}>
                        <div className="mt-5">
                            <Button text="login" type="onSumbit"/>
                        </div>   
                    </div>
                    {error && <p className="text-red-700">{error}</p>}
                    
                    <div className="mt-5 text-center">
                        <p className="text-white">¿No tienes una cuenta? <Link to="/register" className="text-lime-400 underline">Regístrate aquí</Link></p>
                    </div>
                </form>  
            </div>
        </div>
    );
};