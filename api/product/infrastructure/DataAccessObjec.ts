import { Product } from '../../../models/Product';
import { ProductFinder, ProductUpdater, PriceFinder } from '../domain/Repository';
import ProductEntity from '../domain/Product';

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