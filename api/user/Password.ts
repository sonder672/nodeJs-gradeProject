export const Password = (password: string) => {
    if(!/.{8,}/.test(password)) 
        throw {
            statusCode: 400,
            message: 'Contraseña demasiado corta, debe contener por lo menos 8 carácteres'
        };

    if (!/(?:[A-Z])/.test(password))
        throw {
            statusCode: 400,
            message: 'Contraseña insegura. Debe agregar por lo menos una letra mayúscula'
        };

    return password;
};