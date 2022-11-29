import { Request, Response } from 'express';
import { createLeadService } from './IoC';
import config from 'config';

export default class Controller {
    public saveAndSendLead = async({body}: Request, response: Response) => {
        try {
            const { cartContent } = body;

            const urlToSend = await createLeadService.saveLead({cartContent, phone: config.get('adm.phone')});
            return response.status(201).json({message: 'Created', send: urlToSend});
        } catch (error) {
            return response.status(error.statusCode).json(
                {message: error.message}
            );
        }
    };
}