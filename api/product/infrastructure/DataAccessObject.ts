import { Product } from '../../../models/Product';
import { ProductImages } from '../../../models/ProductImages';
import { ProductCreator, ProductFinder, ProductUpdater, ListOfProducts, PriceFinder } from '../domain/Repository';
import ProductEntity from '../domain/Product';
import { MultipleImages } from './MultipleImages';
import dataSource from '../../../database';

export class CreateProduct implements ProductCreator {
    public saveProduct = async (product: ProductEntity): Promise<void> => {
        try {
            const { images, ...productToSave } = product;

            await MultipleImages(images);

            const productImagesToSave = images.map(image => {
                return {
                    imageName: image.name, 
                    productUuid: productToSave.uuid
                };
            });
            
            await dataSource.manager.transaction(async (transactionalEntityManager) => {
                const newProduct = transactionalEntityManager.create(
                    Product, productToSave
                );
                await transactionalEntityManager.save(newProduct);
                await transactionalEntityManager
                    .createQueryBuilder()
                    .insert()
                    .into(ProductImages)
                    .values(Object.values(productImagesToSave))
                    .execute();
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
                categoryUuid: product.categoryUuid
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

export class FindPrice implements PriceFinder {
    public getPrice = async (uuid: string): Promise<number> => {
        try {
            const productPrice = await Product.find({
                select: ['price'],
                where: { uuid },
                take: 1
            });

            return productPrice[0].price;
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };
}