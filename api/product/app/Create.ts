import Product from '../domain/Product';
import { ProductCreator } from '../domain/Repository';
import categoryFinderService from '../../category/app/FindCategoryUuid';
import { CategoryUuidFinder } from '../../category/domain/Repository';

export default class Create {
    constructor(
        private readonly creator: ProductCreator,
        private readonly categoryFinder: CategoryUuidFinder
    ){}

    public saveProduct = async({name, price, stock, categoryUuid}: { name: string, price: number, stock: number, categoryUuid: string }): Promise<void> => {
        try {
            const categoryService = new categoryFinderService(this.categoryFinder);
            await categoryService.existingCategoryUuid(categoryUuid);

            const productEntity = new Product(
                name, 
                price, 
                stock,
                categoryUuid
            );
            
            await this.creator.saveProduct(productEntity);
        } catch (error) {
            throw {
                statusCode: error.statusCode,
                message: error.message || error
            };
        }
    };
}