import { ProductCreator } from '../../domain/Repository';
import ProductEntity from '../../domain/Product';
import { Product } from '../../../../models/Product';
import { ProductImages } from '../../../../models/ProductImages';
import dataSource from '../../../../database';
import { saveMultipleImages } from '../MultipleImages';

export class CreateProduct implements ProductCreator {
    public saveProduct = async (product: ProductEntity): Promise<void> => {
        try {
            const { images, ...productToSave } = product;

            await saveMultipleImages(images);

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