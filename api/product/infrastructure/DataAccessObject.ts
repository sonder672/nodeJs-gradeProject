import { Product } from '../../../models/Product';
import { ProductCreator, ProductFinder, ProductUpdater, ListOfProducts } from '../domain/Repository';
import ProductEntity from '../domain/Product';

export class CreateProduct implements ProductCreator {
    public saveProduct = async (product: ProductEntity): Promise<void> => {
        try {
            await Product.insert({
                uuid: product.uuid,
                name: product.name,
                available: product.available,
                price: product.price,
                stock: product.stock,
                category: product.categoryUuid
            });
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };
}

export class UpdateProduct implements ProductUpdater {
    public updateProduct = async({ uuid, product }: { uuid: string; product: ProductEntity }): Promise<void> => {
        try {
            await Product.update({ uuid }, {
                name: product.name,
                available: product.available,
                price: product.price,
                stock: product.stock,
                category: product.categoryUuid
            });
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };

}

export class AllProducts implements ListOfProducts {
    public getAllProducts = async (): Promise<Product[]> => {
        try {
            return Product.find();
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };

    public getAllActiveProducts = async (): Promise<Product[]> => {
        try {
            return Product.find({
                where:{
                    available: true
                },
            });
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };
}

export class FindProduct implements ProductFinder {
    public getProduct = async(uuid: string): Promise<Product | null> => {
        try {
            return Product.findOneBy({ uuid });
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };
}