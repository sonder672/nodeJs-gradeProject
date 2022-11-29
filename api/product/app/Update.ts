import Product from '../domain/Product';
import { ProductFinder, ProductUpdater } from '../domain/Repository';
import ProductFinderService from './FindProductUuid';
import categoryFinderService from '../../category/app/FindCategoryUuid';
import { CategoryUuidFinder } from '../../category/domain/Repository';

export default class Update {
    constructor(
        private readonly updater: ProductUpdater,
        private readonly findUuid: ProductFinder,
        private readonly categoryFinder: CategoryUuidFinder
    ) {}

    public updateProduct = async({uuid, name, price, stock, categoryUuid, colorAndImage}: { uuid: string, name: string, price: number, stock: number, categoryUuid: string, colorAndImage }): Promise<void> => {
        const finderService = new ProductFinderService(this.findUuid);
        const categoryService = new categoryFinderService(this.categoryFinder);
        console.log(colorAndImage);
        try {
            Promise.all([
                finderService.existingProductUuid(uuid),
                categoryService.existingCategoryUuid(categoryUuid)
            ]);

            const productEntity = new Product(
                name, 
                price, 
                stock,
                categoryUuid,
                'colors',
            );
            delete productEntity[uuid];
            await this.updater.updateProduct({
                uuid, 
                product: productEntity
            });
        } catch (error) {
            throw {
                statusCode: error.statusCode,
                message: error.message || error
            };
        }
    };
}