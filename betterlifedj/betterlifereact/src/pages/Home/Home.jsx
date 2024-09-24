import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../const/routes";
import { Link } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <p>HOLA MUNDO HOME</p>
            <Link to={ROUTES.profile}>Go to Profile</Link> {/* Enlace a Profile */}
        </div>
    );
};