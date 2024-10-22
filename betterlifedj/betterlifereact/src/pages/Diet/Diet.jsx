import { DietForm } from "../../components" 

export const Diet = ({ userData }) => {
    return (
        <div>
            {/* Tu formulario actual */}
            <DietForm userData={userData} />
        </div>
    );
};