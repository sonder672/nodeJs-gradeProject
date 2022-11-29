export const Email = (email: string) => {
    // eslint-disable-next-line
    const regulateExpression = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(!regulateExpression.test(email)) 
        throw {
            statusCode: 400,
            message: 'Correo electrónico erróneo, agregue uno válido'
        };
    
    return email;
};