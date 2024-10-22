import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Diary.module.css'; 

export const FoodSelector = ({ onSelectFood }) => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/foods', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    }
                });
                setFoods(response.data);
            } catch (error) {
                console.error('Error al obtener los alimentos:', error);
            }
        };

        fetchFoods();
    }, []);

    return (
        <select onChange={(e) => onSelectFood(e.target.value)}>
            <option value="">Selecciona un alimento</option>
            {foods.map(food => (
                <option key={food.idFood} value={food.idFood}>
                    {food.foodName}
                </option>
            ))}
        </select>
    );
};

export const Diary = () => {
    const [selectedFoodBreakfast, setSelectedFoodBreakfast] = useState(null);
    const [selectedFoodLunch, setSelectedFoodLunch] = useState(null);
    const [selectedFoodDinner, setSelectedFoodDinner] = useState(null);
    const [waterIntake, setWaterIntake] = useState(0); // ml
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [error, setError] = useState(null);

    const handleSelectFoodBreakfast = (foodId) => setSelectedFoodBreakfast(foodId);
    const handleSelectFoodLunch = (foodId) => setSelectedFoodLunch(foodId);
    const handleSelectFoodDinner = (foodId) => setSelectedFoodDinner(foodId);

    const handleSaveDiary = async (event) => {
        event.preventDefault();
        try {
            const diaryData = {
                date: date,
                water_intake: waterIntake,
                meals: {
                    breakfast: selectedFoodBreakfast ? [{ idMealFood: selectedFoodBreakfast }] : [],
                    lunch: selectedFoodLunch ? [{ idMealFood: selectedFoodLunch }] : [],
                    dinner: selectedFoodDinner ? [{ idMealFood: selectedFoodDinner }] : [],
                },
            };

            const response = await axios.post('http://localhost:8000/api/diary/save', diaryData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }
            });

            console.log('Datos guardados con éxito:', response.data);
            setSelectedFoodBreakfast(null);
            setSelectedFoodLunch(null);
            setSelectedFoodDinner(null);
            setWaterIntake(0);
        } catch (err) {
            console.error('Error al guardar el diario:', err);
            setError('Error al guardar el diario. Por favor, inténtalo de nuevo.');
        }
    };

    const incrementWaterIntake = () => setWaterIntake(prev => prev + 250);
    const incrementWaterIntakeMore = () => setWaterIntake(prev => prev + 250); // Función para sumar más agua

    const changeDate = (direction) => {
        const currentDate = new Date(date);
        direction === 'next'
            ? currentDate.setDate(currentDate.getDate() + 1)
            : currentDate.setDate(currentDate.getDate() - 1);
        setDate(currentDate.toISOString().slice(0, 10));
    };

    return (
        <div>
            <h1>Diario de Nutrición</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <button onClick={() => changeDate('previous')}>←</button>
                <span>{date}</span>
                <button onClick={() => changeDate('next')}>→</button>
            </div>
            <form onSubmit={handleSaveDiary}>
                <h2>Desayuno</h2>
                <FoodSelector onSelectFood={handleSelectFoodBreakfast} />
                <h2>Almuerzo</h2>
                <FoodSelector onSelectFood={handleSelectFoodLunch} />
                <h2>Cena</h2>
                <FoodSelector onSelectFood={handleSelectFoodDinner} />
                <h2>Consumo de Agua</h2>
                <p>{waterIntake} ml</p>
                <button type="button" onClick={incrementWaterIntake}>Agregar 250 ml</button>
                <button type="button" onClick={incrementWaterIntakeMore}>Más</button> {/* Botón para sumar 250 ml más */}
                <button type="submit">Guardar Diario</button>
            </form>
        </div>
    );
};