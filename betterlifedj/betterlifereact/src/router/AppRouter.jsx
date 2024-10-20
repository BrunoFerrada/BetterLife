import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PagesRoutes } from "../routes/PagesRoutes";
import {ROUTES} from "../const/routes";
import { Home, Profile, Login, Register} from "../pages";

const router = createBrowserRouter([
    {
        element: <PagesRoutes />,
        children: [{
            path: ROUTES.home,
            element: <Home />, //pagina principal

        },
        {
            path: ROUTES.profile,
            element: <Profile />, //vista perfil de usuario
        },
        ],
    },
    {
        path: ROUTES.register,
        element: <Register />,
    },
    {
        path: ROUTES.login,
        element: <Login />,
    },
]);

export const AppRouter = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};