import { VscAccount } from "react-icons/vsc";
import style from "./Profile.module.css";

import React from 'react';
import { Button } from "../../components";

export const Profile = () => {
    const user = {
        username: 'usuario123',
        email: 'usuario@example.com',
        weight: '70',
        height: '1.70',
        sex: 'Hombre',
        age: '20',
        activity: 'Moderada',
        basalMetabolism: '1797',
        bodyMassIndex: '27.94',
        waterRequirement: '2750',
        calorieRequirement: '2507',
    };

    return (
        <div className="container mx-auto px-4">
            <div className={style.profile_container}>
                <h1 className={style.title}>Perfil de Usuario</h1>
                
                <div className={style.profile_content}>
                    <div className={style.user_image}><VscAccount  className="text-8xl" /><p>@{user.username}</p></div>
                    <div className={style.profile_text}>
                        
                        <p>{user.email}</p>
                        <p>Peso: {user.weight}Kg</p>
                        <p>Altura: {user.height}</p>
                        <p>Edad: {user.age}</p>
                        <p>Actividad: {user.activity}</p>
                        <p>Metabolismo basal: {user.basalMetabolism}kcal</p>
                        <p>Indice de masa corporal: {user.bodyMassIndex}</p>
                        <p>Requerimiento de agua: {user.waterRequirement}</p>
                        <p>Requerimiento calorico: {user.calorieRequirement}kcal</p>
                    </div>
                    

                </div>
                <div className={style.buttons_container}>
                        <div className="mt-10 space-x-4">
                            <Button text="Editar" /*onClick={onClickEditHandler}*/ />
                            <Button text="Cerrar sesion" /*onClick={onClickLogOutHandler}*/ />
                        </div>
                </div>
            </div>
        </div>
        
    );
};