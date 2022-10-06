export const Password = (password: string) => {
    if(!/.{8,}/.test(password)) 
        throw {
            statusCode: 400,
            message: 'Short password. Add a longer'
        };

    if (!/(?:[A-Z])/.test(password))
        throw {
            statusCode: 400,
            message: 'Insecure password. Add at least one capital letter'
        };

    return password;
};