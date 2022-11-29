import { ListOfCategories } from '../domain/Repository';
export default class Categories {
    constructor(private readonly lister: ListOfCategories) {}

    public getAllCategories = async() => {
        try {
            return await this.lister.getAllCategories();
        } catch (error) {
            throw {
                statusCode: error.statusCode,
                message: error.message || error
            };
        }
    };

    public getCategories = async() => {
        const categories = await this.lister.getCategoriesToMatch();
        return categories;
    };
}