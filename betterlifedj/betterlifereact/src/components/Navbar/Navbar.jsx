import style from "./Navbar.module.css";
import { GiAvocado } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";


export const Navbar = () => {
    return (
        <navbar className={style.navbar_container}>
            <div className={style.navbar_content}>
                <div className={style.img_avocado}>
                    <GiAvocado className="text-5xl"/>
                </div>
                <h1 className={style.title}>BetterLife</h1>
                <div className={style.options}>
                    <div className={style.home}>
                        <Link to="/"><p className="ml-1"> Home</p></Link>
                    </div>
                    <div className={style.routine}>
                        <p className="">Rutinas</p>
                    </div>
                    <div className={style.food}>
                        <p className="">Diario</p>
                    </div>
                </div>

                <div className={style.img_account_icon}>
                    <Link to="/profile"><MdAccountCircle className="text-5xl" /></Link>
                </div>
            </div>
        </navbar>
    );
};