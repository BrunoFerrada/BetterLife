import { VscAccount } from "react-icons/vsc";
import style from "./Profile.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import axios from 'axios';  // Importamos Axios

export const Profile = () => {
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editableData, setEditableData] = useState({});
    const [message, setMessage] = useState("");  // Estado para los mensajes

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('access_token'); // Obtenemos el token

                const response = await axios.get('http://localhost:8000/profile/', {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Usamos el token en el header
                    },
                });

                setUserData(response.data);  // Establecemos los datos del usuario
                setEditableData(response.data); // Establecemos los datos para editar
            } catch (error) {
                console.error('Error al obtener los datos:');
                setMessage("Error al obtener los datos."); // Mensaje de error
            }
        };

        fetchUserData();
    }, []);

    const onClickLogOutHandler = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/');
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setMessage(""); // Limpiar mensaje al editar
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableData({
            ...editableData,
            [name]: value,
        });
    };

    const handleSaveClick = async () => {
        try {
            const token = localStorage.getItem('access_token'); // Obtenemos el token

            await axios.put('http://localhost:8000/edit-profile/', editableData, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Autorización con el token
                    'Content-Type': 'application/json',
                },
            });

            setMessage('Datos guardados exitosamente'); // Mensaje de éxito
            setIsEditing(false);
            setUserData(editableData); // Actualiza los datos del usuario con los editados
        } catch (error) {
            console.error('Error al guardar los datos');
            setMessage("Error al guardar los datos "); // Mensaje de error
        }
    };

    // Define las opciones para el desplegable
    const activityOptions = [
        { value: 'sedentario', label: 'Sedentario' },
        { value: 'ligera', label: 'Ligera' },
        { value: 'moderada', label: 'Moderada' },
        { value: 'activo', label: 'Activo' },
        { value: 'muy_activo', label: 'Muy activo' },
       
    ];

    return (
        <div className="container mx-auto px-4">
            <div className={style.profile_container}>
                <h1 className={style.title}>Perfil de Usuario</h1>
                
                {message && <p className={style.message}>{message}</p>} {/* Mostrar mensaje aquí */}
                
                <div className={style.profile_content}>
                    <div className={style.user_image}>
                        <VscAccount className="text-8xl" />
                        <p>@{userData.username}</p>
                    </div>
                    <div className={style.profile_text}>
                        <p>Email: {isEditing ? <input name="email" value={editableData.email} onChange={handleInputChange} /> : userData.email}</p>
                        <p>Peso: {isEditing ? <input name="weight" value={editableData.weight} onChange={handleInputChange} /> : `${userData.weight} Kg`}</p>
                        <p>Altura: {isEditing ? <input name="height" value={editableData.height} onChange={handleInputChange} /> : userData.height}</p>
                        <p>Edad: {isEditing ? <input name="age" value={editableData.age} onChange={handleInputChange} /> : userData.age}</p>
                        <p>Actividad: {isEditing ? (
                            <select name="activity" value={editableData.activity} onChange={handleInputChange}>
                                {activityOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        ) : userData.activity}</p>
                    </div>
                </div>
                
                <div className={style.buttons_container}>
                    <div className="mt-10 space-x-4">
                        {!isEditing ? (
                            <Button text="Editar" onClick={handleEditClick} />
                        ) : (
                            <Button text="Guardar" onClick={handleSaveClick} />
                        )}
                        <Button text="Cerrar sesión" onClick={onClickLogOutHandler} />
                    </div>
                </div>
            </div>
        </div>
    );
};