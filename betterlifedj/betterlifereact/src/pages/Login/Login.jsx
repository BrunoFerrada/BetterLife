import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import { Button } from "../../components";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const onClickSumbitHandler = () => {

    }
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
        <div className="container mx-auto px-4">
            <div className= {style.login_container}>
                <div>
                    <h2 className={style.tittle}>Login</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={style.form_content}>
                        <div>
                            <label className="text-base md:text-lg">Username: </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="text-black"
                            />
                        </div>
                        <div>
                            <label className="text-base md:text-lg">Password: </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="text-black"
                            />
                        </div>
                    </div>    
                    <div className={style.button_container}>
                        <div className="mt-5">
                            <Button text="login" type="onSumbit"/>
                        </div>
                        
                    </div>
                    {error && <p className="text-red-700">{error}</p>}
                    
                </form>
                
                
            </div>
        </div>
    );
};