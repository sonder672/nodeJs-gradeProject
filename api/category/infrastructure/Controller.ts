import { createCategoryService, updateCategoryService, categoriesService } from './IoC';
import { Request, Response } from 'express';

export default class Controller {
    public saveCategory = async(request: Request, response: Response) => {
        const { name } = request.body;
        const image = request.files?.image;

        try {
            const category = await createCategoryService.saveCategory(name, image);

            return response.status(201).json({message: 'Created', category});
        } catch(error) {
            return response.status(error.statusCode).json(
                {message: error.message}
            );
        }
    };
   
    public updateUser = async(request: Request, response: Response) => {
        const { uuid } = request.params;
        const { name } = request.body;

        try {
            await updateCategoryService.updateCategory({uuid, name});

            return response.status(200).json({message: 'Updated'});
        } catch (error) {
            return response.status(error.statusCode).json(
                {message: error.message}
            );
        }
    };

    public getAllCategories = async(_request: Request, response: Response) => {
        try {
            const categories = await categoriesService.getAllCategories();

            return response.status(200).json(categories);
        } catch(error) {
            return response.status(error.statusCode).json(
                {message: error.message}
            );
        }
    };

    public getCategoriesToMatch = async(_request: Request, response: Response) => {
        try {
            const categories = await categoriesService.getCategories();

            return response.status(200).json(categories);
        } catch (error) {
            return response.status(error.statusCode).json(
                {message: error.message}
            );
        }
    };
}