def validatePositive(value):
    if value <= 0:
        raise ValueError("Los parámetros deben ser mayores que 0.")

def formulaHarrisBenedict(weight, height, age, sex, activity):
    validatePositive(weight)
    validatePositive(height)
    validatePositive(age)
    if sex not in ['M', 'F']:
        raise ValueError("El sexo debe ser 'M' o 'F'.")

    if sex == 'M':
        basalMet = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    else:  # sex == 'F'
        basalMet = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
    
    
    activityFactors = {
        "sedentario": 1.2,
        "ligera": 1.375,
        "moderada": 1.55,
        "activo": 1.725,
        "muy_activo": 1.9
    }
    
    if activity not in activityFactors:
        raise ValueError("Por favor, elija un nivel de actividad.")

    return basalMet * activityFactors[activity]

def formulaMifflinStJeor(weight, height, age, sex, activity):
    validatePositive(weight)
    validatePositive(height)
    validatePositive(age)
    if sex not in ['M', 'F']:
        raise ValueError("El sexo debe ser 'M' o 'F'.")
    
    if sex == 'M':
        basalMet = (10 * weight) + (6.25 * height) - (5 * age) + 5
    else:  # sex == 'F'
        basalMet = (10 * weight) + (6.25 * height) - (5 * age) - 161
    
    activityFactors = {
        "sedentario": 1.2,
        "ligera": 1.375,
        "moderada": 1.55,
        "activo": 1.725,
        "muy_activo": 1.9
    }
    
    if activity not in activityFactors:
        raise ValueError("Por favor, elija un nivel de actividad.")

    return basalMet * activityFactors[activity]

def formulaWaterRequirement(weight):
    validatePositive(weight)
    return 35 * weight

def formulaIMC(weight, height):
    validatePositive(weight)
    validatePositive(height)
    return weight / height ** 2