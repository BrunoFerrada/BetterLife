import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const DietForm = ({ userData }) => {
    const [calories, setCalories] = useState(2400);
    const [nutrients, setNutrients] = useState({
        carbohydrates: 0,
        protein: 0,
        fats: 0,
        dietname: ''
    });

    const [idDiet, setDietId] = useState(null);

    useEffect(() => {
        const fetchDiet = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/diet/${userData.id}/`);
                if (response.data) {
                    setNutrients({
                        carbohydrates: response.data.carbohydrates,
                        protein: response.data.protein,
                        fats: response.data.fats, 
                        dietname: response.data.dietname
                    });
                    setCalories(response.data.calories);
                    setDietId(response.data.idDiet);
                }
            } catch (error) {
                console.error('Error al obtener la dieta', error)
            }
        };

        fetchDiet();
    }, [userData.id]);

    const handleNutrients = (diet, calories) => {
        let carbohydrates, protein, fats, dietname;

        switch(diet) {
            case 1:
                dietname = "Dieta Estándar";
                carbohydrates = (50 / 100) * calories / 4;
                protein = (20 / 100) * calories / 4;
                fats = (30 / 100) * calories / 9;
                break;
            case 2:
                dietname = "Equilibrada";
                carbohydrates = (50 / 100) * calories / 4;
                protein = (25 / 100) * calories / 4;
                fats = (25 / 100) * calories / 9;
                break;
            case 3:
                dietname = "Baja en grasas";
                carbohydrates = (60 / 100) * calories / 4;
                protein = (25 / 100) * calories / 4;
                fats = (15 / 100 ) * calories / 9;
                break;
            case 4:
                dietname = "Alta en proteinas";
                carbohydrates = (25 / 100) * calories / 4;
                protein = (40 / 100) * calories / 4;
                fats = (35 / 100 ) * calories / 9;
                break;
            case 5:
                dietname = "Cetogenica";
                carbohydrates = (5 / 100) * calories / 4;
                protein = (30 / 100) * calories / 4;
                fats = (65 / 100 ) * calories / 9;
                break;
            default:
                dietname = "Sin dieta seleccionada";
                carbohydrates = 0;
                protein = 0;
                fats = 0;
        }

        setNutrients({ carbohydrates, protein, fats, dietname });
    };

    const handleSubmit = async () => {
        try {
            const dietData = {
                idDiet: idDiet,
                dietname: nutrients.dietname,
                calories: calories, 
                protein: nutrients.protein,
                carbohydrates: nutrients.carbohydrates,
                fats: nutrients.fats,
                user: userData.id
            }

            const response = idDiet
                ? await axios.put(`http://localhost:8000/diet/${idDiet}/`, dietData)
                : await axios.post('http://localhost:8000/diet/', dietData);

            console.log('Datos enviados correctamente', response.data);
        } catch (error) {
            console.error('Error al enviar los datos', error);
        }

    return (
        <div>
            <h2>Calcular Macronutrientes</h2>
            <input 
                type="number" 
                value={calories} 
                onChange={(e) => setCalories(e.target.value)} 
                placeholder="Ingrese calorías diarias"
            />
            <select onChange={(e) => handleNutrients(e.target.value, calories)}>
                <option value={1}>Dieta Estándar</option>
                <option value={2}>Equilibrada</option>
                <option value={3}>Baja en grasas</option>
                <option value={4}>Alta en proteinas</option>
                <option value={5}>Cetogenice</option>
            </select>
            <button onClick={handleSubmit}>Calcular</button>

            <div>
                <p>Carbohidratos: {nutrients.carbohydrates} g</p>
                <p>Proteínas: {nutrients.protein} g</p>
                <p>Grasas: {nutrients.fats} g</p>
                <p>Tipo de dieta: {nutrients.dietname}</p>
            </div>
        </div>
    );
};
}