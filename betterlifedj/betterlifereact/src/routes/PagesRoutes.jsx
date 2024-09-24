import {Outlet} from "react-router-dom";
import {Footer, Navbar} from "../components";
import { ROUTES } from "../const/routes";

const isAuthenticated = () => !!localStorage.getItem("token");

export const PagesRoutes = () => {
    return (    
        <>
            {isAuthenticated() ? (
                <>
                    <Navbar />
                    <div className="flex flex-col min-h-[100vh]">
                        <Outlet />
                    </div>
                    <Footer />
                </>
            ) : (
            <Navigate to={ROUTES.login} replace/>
            )}
        </>
    );
};