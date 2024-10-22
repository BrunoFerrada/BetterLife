import { VscAccount } from "react-icons/vsc";
import style from "./Profile.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import axios from 'axios';  

export const Profile = () => {
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editableData, setEditableData] = useState({});
    const [message, setMessage] = useState("");
    const [selectedFormula, setSelectedFormula] = useState('harris'); 
    const [results, setResults] = useState({ tbm: null, waterRequirement: null, imc: null }); 
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
                setMessage("Error al obtener los datos."); 
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
            const token = localStorage.getItem('access_token'); 

            await axios.put('http://localhost:8000/edit-profile/', editableData, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Autorización con el token
                    'Content-Type': 'application/json',
                },
            });

            setMessage('Datos guardados exitosamente'); 
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

    const sexOptions = [
        { value: 'Masculino', label: 'Masculino'},
        { value: 'Femenino', label: 'Femenino'},
    ]

    // Manejar el cambio de fórmula
    const handleFormulaChange = (e) => {
        setSelectedFormula(e.target.value);
    };

    // Calcular TMB, requerimiento de agua e IMC
    const calculateResults = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.post('http://localhost:8000/calculation/', {
                formula: selectedFormula
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            // Guardar los resultados en el estado
            setResults({
                tbm: response.data.tbm,
                waterRequirement: response.data.water_requirement,
                imc: response.data.imc
            });
        } catch (error) {
            console.error('Error al calcular los resultados:', error);
            setMessage("Error al calcular los resultados."); // Mensaje de error
        }
    };

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
                        <p>Peso: {isEditing ? <input name="weight" value={editableData.weight} onChange={handleInputChange} /> : userData.weight}</p>
                        <p>Altura: {isEditing ? <input name="height" value={editableData.height} onChange={handleInputChange} /> : userData.height}</p>
                        <p>Edad: {isEditing ? <input name="age" value={editableData.age} onChange={handleInputChange} /> : userData.age}</p>
                        <p>Sexo: {isEditing ? (
                            <select name="sex" value={editableData.sex} onChange={handleInputChange}> 
                                {sexOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        ) : userData.sex}</p>
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


                <h2 className={style.title}>Calcular TMB</h2>
                <div className={style.calculation_content}>
                    
                    <div className={style.profile_text}>
                        <label htmlFor="formula">Selecciona una fórmula:</label>
                        <select id="formula" value={selectedFormula} onChange={handleFormulaChange}>
                            <option value="harris">Harris-Benedict</option>
                            <option value="mifflin">Mifflin-St Jeor</option>
                        </select>
                    </div>
                    
                    <div className={style.profile_text}>
                    {results.tbm !== null && (
                        <div>
                            <p>Tasa de Metabolismo Basal (TMB): {results.tbm}</p>
                            <p>Índice de Masa Corporal (IMC): {results.imc}</p>
                            <p>Requerimiento de Agua: {results.waterRequirement} ml/día</p>
                        </div>
                    )}
                    </div>
                </div>
                <div className={style.buttons_container}>
                    <div className="mt-10 space-x-4">
                        <Button text="Calcular" onClick={calculateResults} />
                    </div>
                </div>
            </div>
        </div>
    );
};