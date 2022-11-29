import config from 'config';
import jsonWebToken from 'jsonwebtoken';

export const verifyToken = async (token) => {
    try {
        return <any>jsonWebToken.verify(token, config.get('server.jwt'));
    } catch (error) {
        throw {
            statusCode: 404,
            message: 'No se encontró'
        };
    }
};