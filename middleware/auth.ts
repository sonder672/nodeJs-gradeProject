import { verifyToken } from '../api/user/authentication/infrastructure/vetifyToken';
import { Request, Response, NextFunction } from 'express';
import { getRoleByUuid } from '../api/user/authentication/infrastructure/getRole';

export const checkAuth = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ').pop();
        const tokenData = await verifyToken(token);
        const userRole = await getRoleByUuid(tokenData.uuid);
        if (userRole[0].role.id === 2) {
            next();
        } else {
            res.status(404);
            res.send({error: 'Página no encontrada'});
        }
    } catch(error) {
        res.status(404);
        res.send({error: 'Página no encontrada'});
    }
};