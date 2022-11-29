import { Request, Response } from 'express';
import { colorsService, createColorService } from './IoC';

export default class Controller {
    public saveColor = async(request: Request, response: Response) => {
        const { hexadecimalCode, name } = request.body;

        try {
            const color = await createColorService.saveColor(hexadecimalCode, name);

            return response.status(201).json({message: 'Created', color});
        } catch(error) {
            return response.status(error.statusCode).json(
                {message: error.message}
            );
        }
    };

    public getAllColors = async(_request: Request, response: Response) => {
        try {
            const colors = await colorsService.getAllColors();

            return response.status(200).json(colors);
        } catch(error) {
            return response.status(error.statusCode).json(
                {message: error.message}
            );
        }
    };
}