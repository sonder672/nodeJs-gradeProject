import { ListOfProducts } from '../../domain/Repository';
import { Product } from '../../../../models/Product';
import { getMultipleImages } from '../MultipleImages';

export class AllProducts implements ListOfProducts {
    public getAllProducts = async () => {
        try {
            const products = await Product.find(); 
            const getProductWithImages = await Promise.all(
                await this.getImagesByProductUuid(products)
            );

            return getProductWithImages;
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };

    private getImagesByProductUuid = async (products: Product[]) => {
        const images = products.map(async product => {
            const { images, ...otherElementsProduct } = product;
            const nameImages = images.map(image => {
                return image.imageName;
            });

            const getImagesFromS3 = await getMultipleImages(nameImages);
            const files = getImagesFromS3.map(file => {
                return file?.ETag;
            });

            return {
                product: otherElementsProduct,
                files
            };
        });

        return images;
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