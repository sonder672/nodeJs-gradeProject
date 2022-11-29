import { ProductCreator } from '../../domain/Repository';
import ProductEntity from '../../domain/Product';
import { Product } from '../../../../models/Product';
import { ProductImages } from '../../../../models/ProductImages';
import dataSource from '../../../../database';
import { saveMultipleImages, saveOneImageBase64 } from '../MultipleImages';

export class CreateProduct implements ProductCreator {
    public saveProduct = async (product: ProductEntity): Promise<void> => {
        try {
            const { colorAndImage, ...productToSave } = product;
            
            const productImagesToSave =  await this.saveImageInS3(
                colorAndImage, 
                productToSave.uuid
            );

            await dataSource.manager.transaction(async (transactionalEntityManager) => {
                const newProduct = transactionalEntityManager.create(
                    Product, productToSave
                );
                await transactionalEntityManager.save(newProduct);
                await transactionalEntityManager
                    .createQueryBuilder()
                    .insert()
                    .into(ProductImages)
                    .values(productImagesToSave)
                    .execute();
            });
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };

    private saveImageInS3 = async(colorAndImage, product: string) => {
        if (typeof colorAndImage.length === 'undefined') {
            await saveOneImageBase64(colorAndImage.imageBase64, colorAndImage.imageName);
            return {
                imageName: colorAndImage.imageName, 
                product,
                color: colorAndImage.color
            };
        } 

        await saveMultipleImages(colorAndImage);
        const imageName = colorAndImage.map(element => {
            return {
                imageName: element.imageName, 
                product,
                color: element.color
            };
        });

        return imageName;
    };
}



