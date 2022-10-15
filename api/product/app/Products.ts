import { ListOfProducts } from '../domain/Repository';

export default class Products {
    constructor(
        private readonly lister: ListOfProducts
    ) {}

    public getAllProducts = async() => {
        try {
            return await this.lister.getAllProducts();
        } catch (error) {
            throw {
                statusCode: error.statusCode,
                message: error.message || error
            };
        }
    };

    public getAllActiveProducts = async() => {
        try {
            return await this.lister.getAllActiveProducts();
        } catch (error) {
            throw {
                statusCode: error.statusCode,
                message: error.message || error
            };
        }
    };
}