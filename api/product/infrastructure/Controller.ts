import { createProductService, updateProductService, productsService } from './IoC';
import { Request, Response } from 'express';

export default class Controller {
    public createProduct = async(request: Request, response: Response) => {
        const { name, price, stock, categoryUuid } = request.body;
        const images = request.files?.image;

        try {
            await createProductService.saveProduct({
                name, price, stock, categoryUuid, images
            });

            return response.status(201).json({message: 'Created'});
        } catch(error) {
            return response.status(error.statusCode).json(
                {message: error.message}
            );
        }
    };
   
    public updateProduct = async(request: Request, response: Response) => {
        const { uuid } = request.params;
        const { name, price, stock, categoryUuid } = request.body;

        try {
            await updateProductService.updateProduct(
                {uuid, name, price, stock, categoryUuid}
            );

            return response.status(200).json({message: 'Updated'});
        } catch (error) {
            return response.status(error.statusCode).json(
                {message: error.message}
            );
        }
    };

    public getAllProducts = async(_request: Request, response: Response) => {
        try {
            const products = await productsService.getAllProducts();

            return response.status(200).json({ products });
        } catch(error) {
            return response.status(error.statusCode).json(
                {message: error.message}
            );
        }
    };

    public getAllActiveProducts = async(_request: Request, response: Response) => {
        try {
            const products = await productsService.getAllActiveProducts();

            return response.status(200).json({ products });
        } catch(error) {
            return response.status(error.statusCode).json(
                {message: error.message}
            );
        }
    };
}