import { Request, Response } from 'express';
import { create } from './IoC';

export default class Controller {
    public saveCartContent = async(request: Request, response: Response) => {
        const { quantity, productUuid } = request.body;

        try {
            const cartContent = await create.saveCart({
                quantity, 
                productUuid
            });

            return response.status(201).json({
                message: 'Created',
                cart: cartContent
            });
        } catch(error) {
            return response.status(error.statusCode).json(
                {message: error.message}
            );
        }
    };
}