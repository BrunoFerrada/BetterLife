import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../const/routes";
import { GiAvocado } from "react-icons/gi";
import style from "./Welcome.module.css";
import { Button } from "../../components";
import image3 from "../../assets/images/image3.jpg"


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
  <div className="z-10 h-screen w-full md:w-3/4 lg:w-2/4 absolute px-4 md:px-10 grid place-items-center bg-[#1D4F06] start-0 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)]">
    <div className="h-auto w-full md:w-3/4 lg:w-2/4">
      <div className="flex items-center justify-center w-full">
        <GiAvocado className="text-lime-400 text-4xl md:text-5xl" />
        <h1 className={style.title}>BetterLife</h1>
      </div>
      <div className={style.welcome_content}>
        <div className={style.welcome_text}>
          <p className="uppercase text-xl md:text-2xl m-2 md:m-4">¡Bienvenido!</p>
          <p>BetterLife es una aplicación con la cual podrás llevar un control sobre la ingesta de alimentos diarios mediante una lista de alimentos diaria y visualizar rutinas de ejercicio segun tu objetivo!</p>
        </div>
        <div className="mt-4 md:mt-10 space-x-2 md:space-x-4 flex justify-center">
          <Button text="Registrarse" onClick={onClickRegisterHandler}/> 
          <Button text="Iniciar Sesión" onClick={onClickLoginHandler}/>
        </div>
      </div>
    </div>
  </div>
  <div className="z-0 h-screen w-full absolute grid place-items-end end-0 overflow-hidden">
    <div className="h-full w-full">
      <img src={image3} alt="imagen de fondo" className="object-cover w-full h-full"/>
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-lime-500 to-transparent"></div>
  </div>
</div>

    );
};