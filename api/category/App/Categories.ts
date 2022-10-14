import { ListOfCategories } from '../Domain/Repository';
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
}