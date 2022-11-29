import { saveUser, logIn } from './IoC';
import { Request, Response } from 'express';
import jsonWebToken from 'jsonwebtoken';
import config from 'config';

export default class Controller {
    public signUp = async (request: Request, response: Response) => {
        const { email, password } = request.body;
        try {
            const validatedUser = await logIn.signup({ email, password });

            const token = jsonWebToken.sign(validatedUser, config.get('server.jwt'));

            return response.status(200).json(
                {message: 'Welcome back', token, uuid: validatedUser.uuid}
            );
        } catch (error) {
            return response.status(error.statusCode).json(
                { message: error.message }
            );             
        }
    };

    public signIn = async (request: Request, response: Response) => {
        const { email, password, name, lastName } = request.body;
        try {
            await saveUser.signin({
                email, 
                password, 
                name, 
                lastName
            });
            
            return response.status(201).json(
                {message: 'created'}
            );
        } catch (error) {
            return response.status(error.statusCode).json(
                { message: error.message }
            );             
        }
    };

    public validateViewAccess = (_request: Request, response: Response) => {
        return response.status(200).json(
            {message: '¡Bienvenido de vuelta, administrador!'}
        );
    };
}