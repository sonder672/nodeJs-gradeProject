import { Request, Response, NextFunction } from 'express';

export const verifyFile = (request: Request, response: Response, next: NextFunction) => {
    if (!request.files || Object.keys(request.files).length === 0)
        return response.status(400).json(
            {message: 'No se cargó ningún archivo'}
        );

    next();
};