import style from "./Navbar.module.css";
import { GiAvocado } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export const Navbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const onClickLogOutHandler = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <navbar className={style.navbar_container}>
            <div className={style.navbar_content}>
                {/* Icono del avocado y título */}
                <div className={style.img_avocado}>
                    <GiAvocado className="text-5xl" />
                </div>
                <h1 className={style.title}>BetterLife</h1>

                {/* Icono del menú hamburguesa (visible solo en pantallas pequeñas) */}
                <div className="sm:hidden ml-auto z-40">
                    <button onClick={toggleMenu} className="text-white text-3xl">
                        {menuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>

                {/* Opciones del menú (ocultas en pantallas pequeñas) */}
                <div className={`${style.options} hidden sm:flex`}>
                    <div className={style.home}>
                        <Link to="/home"><p className="ml-1">Home</p></Link>
                    </div>
                    <div className={style.food}>
                        <p>Diario</p>
                    </div>
                    <div className={style.routine}>
                        <Link to="/routine"><p className="ml-1">Rutinas</p></Link> {/* Link añadido a Rutinas */}
                    </div>
                    <div className={style.food}>
                        <Link to="/diary"><p className="ml-1">Diario</p></Link> {/* Link añadido a Diario */}
                    </div>
                </div>

                {/* Iconos de perfil y logout (ocultos en pantallas pequeñas) */}
                <div className={`${style.img_account_icon} hidden sm:flex`}>
                    <Link to="/profile"><MdAccountCircle className="mr-2 text-4xl" /></Link>
                    <FiLogOut className="text-3xl" onClick={onClickLogOutHandler} />
                </div>
            </div>

            {/* Menú hamburguesa (visible solo en pantallas pequeñas) */}
            {menuOpen && (
                <div className={`absolute right-5 mt-2 flex flex-col space-y-4 bg-lime-950 p-4 z-30 transition-all duration-300 ease-linear transform delay-75 ${menuOpen ? 'opacity-80 translate-y-0' : 'opacity-0-translate-y-2 pointer-events-none'}`}>
                    <Link to="/home" className="text-white">Home</Link>
                    <Link to="/routine" className="text-white">Rutinas</Link>
                    <Link to="/diary" className="text-white">Diario</Link> 
                    <Link to="/profile" className="text-white flex items-center">
                        <MdAccountCircle className="mr-2 text-4xl" /> Perfil
                    </Link>
                    <button onClick={onClickLogOutHandler} className="text-white flex items-center">
                        <FiLogOut className="mr-2 text-3xl" /> Logout
                    </button>
                </div>
            )}
        </navbar>
    );
};