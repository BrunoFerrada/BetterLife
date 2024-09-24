import { useNavigate } from "react-router-dom";
import style from "./Home.module.css";
import { ROUTES } from "../../const/routes";
import { Link } from "react-router-dom";
import image1 from "../../assets/images/image1.jpg";
import image2 from "../../assets/images/image2.jpg";
import { Button } from "../../components";

export const Home = () => {
    const navigate = useNavigate();

    return (
      <>
<div className="relative h-screen">
  {/* Imagen de fondo 1 */}
  <div className="relative h-full w-full">
    <img 
      src={image1} 
      alt="Imagen de fondo 1" 
      className="absolute inset-0 w-full h-full object-cover" 
    />
    {/* Degradado superpuesto */}
    <div className="absolute inset-0 bg-gradient-to-r from-lime-500 to-transparent"></div>
    {/* Contenido sobre la imagen */}
    <div className="relative z-10 text-left p-8">
      <h1 className="text-4xl font-bold text-white">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h1>
      <p className="mt-4 text-gray-700">
        Reach your goals with personalized insights, custom budgets, spend tracking, and subscription monitoring — all for free.
      </p>
      <Button text="Diario" />
    </div>
  </div>
</div>

<div className="relative h-screen">
  {/* Imagen de fondo 2 */}
  <div className="relative h-full w-full">
    <img 
      src={image2} 
      alt="Imagen de fondo 2" 
      className="absolute inset-0 w-full h-full object-cover" 
    />
    {/* Degradado superpuesto */}
    <div className="absolute inset-0 bg-gradient-to-l from-lime-500 to-transparent"></div>
    {/* Contenido sobre la imagen */}
    <div className="relative z-10 text-left p-8">
      <h1 className="text-4xl font-bold text-white">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h1>
      <p className="mt-4 text-gray-700">
        Reach your goals with personalized insights, custom budgets, spend tracking, and subscription monitoring — all for free.
      </p>
      <Button text="Rutinas" />
    </div>
  </div>
</div>


    </>
    );
};