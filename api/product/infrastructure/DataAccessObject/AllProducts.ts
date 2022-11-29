import { ListOfProducts } from '../../domain/Repository';
import { Product } from '../../../../models/Product';
import config from 'config';
import dataSource from '../../../../database';
import { Category } from '../../../../models/Category';

export class AllProducts implements ListOfProducts {
    public getAllProducts = async () => {
        try {
            const products = await Product.find(); 
            const getProductWithImages = this.getImagesByProductCategory(products);

            return getProductWithImages;
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };

    public getProductsByCategory = async(categoryUuid: string) => {
        try {
            const products = await dataSource
                .createQueryBuilder()
                .select(['category.uuid', 'product', 'images.imageName', 'color.colorName', 'color.hexadecimalCode'])
                .from(Category, 'category')
                .innerJoin('category.products', 'product')
                .innerJoin('product.images', 'images')
                .innerJoin('images.color', 'color')
                .where('category.uuid = :uuid', {uuid: categoryUuid})
                .getMany();

            const getProductWithImages = 
                this.getImagesByProductCategory(products[0].products);
    
            return getProductWithImages;
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };

    private getImagesByProductCategory = (productsAndTheirImages) => {
        const productUrl: string = config.get('aws.bucketProductUrl');

        const finalProduct = productsAndTheirImages.map(product => {
            const { images, ...productWithoutImages } = product;

            const imagesWithUrlAndColor = Object.values(images).map((file: any) => {
                return {
                    image: `${productUrl}${file.imageName}`,
                    color: {
                        hexadecimalCode: file.color.hexadecimalCode,
                        colorName: file.color.colorName
                    }
                }; 
            });
                
            return {
                images: imagesWithUrlAndColor, 
                ...productWithoutImages
            };
        });

        return finalProduct;
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