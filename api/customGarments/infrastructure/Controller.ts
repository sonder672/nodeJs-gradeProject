import { createCustomService, allCustomGarmentsService } from './IoC';
import { Request, Response } from 'express';

export default class Controller {
    public save = async(request: Request, response: Response) => {
        const { imageBase64, description, user } = request.body;

        try {
            const customization = await createCustomService.save({
                imageBase64, 
                description,
                user
            });

            return response.status(201).json({message: 'Created', image: customization});
        } catch(error) {
            return response.status(error.statusCode).json(
                {message: error.message}
            );
        }
    };

    public getByUser = async(request: Request, response: Response) => {
        const { uuid } = request.body;
        try
        {
            const customizationByUser = await allCustomGarmentsService.getByUser(uuid);
            
            return response.status(200).json(customizationByUser);
        } catch(error) {
            return response.status(error.statusCode).json(
                {message: error.message}
            );
        }
    };
}