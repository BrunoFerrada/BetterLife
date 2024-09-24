import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../const/routes";
import { GiAvocado } from "react-icons/gi";
import style from "./Welcome.module.css";
import { Button } from "../../components";


export const Welcome = () => {
    const navigate = useNavigate();
    const onClickRegisterHandler = () =>{
        navigate(ROUTES.register);
    }
    const onClickLoginHandler = () => {
        navigate(ROUTES.login);
    }

    return (
        <div className={`${style.welcome_container} flex flex-col items-center justify-center`}>
            <div className="flex items-center justify-center w-full">
                <GiAvocado className="text-lime-400 text-5xl" />
                <h1 className={style.title}>BetterLife</h1>
            </div>
            <div className={style.welcome_content}>
                <div className={style.welcome_text}>
                    <p className="uppercase text-2xl m-4">bienvenido!</p>
                    <p>BetterLife es una aplicación con la cual podrás llevar un control sobre la ingesta de alimentos diarios mediante una lista de alimentos diaria y visualizar rutinas de ejercicio segun tu objetivo!</p>
                </div>

                <div className="mt-10 space-x-4 flex justify-center">
                   <Button text="Registrarse" onClick={onClickRegisterHandler}/> 
                   <Button text="Iniciar Sesión" onClick={onClickLoginHandler}/>
                </div>
            </div>
        </div>
    );
};