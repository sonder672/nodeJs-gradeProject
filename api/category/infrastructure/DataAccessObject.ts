import { Category } from '../../../models/Category';
import { CategoryCreator, CategoryUuidFinder, CategoryNameFinder, CategoryUpdater, ListOfCategories } from '../domain/Repository';
import CategoryEntity from '../domain/Category';
import { saveOneImage } from '../../product/infrastructure/MultipleImages';
import config from 'config';

export class Creator implements CategoryCreator {
    public saveCategory = async (category: CategoryEntity): Promise<void> => {
        try {
            await saveOneImage(category.image);

            await Category.insert({
                uuid: category.uuid,
                name: category.name,
                imageName: category.image.name
            });
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };
}

export class Updater implements CategoryUpdater {
    public updateCategory = async({ uuid, category }: { uuid: string; category: CategoryEntity; }): Promise<void> => {
        try {
            await Category.update({ uuid }, { name: category.name });
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };

}

export class CategoryName implements CategoryNameFinder {
    public getNameOfCategory = async (name: string): Promise<Category | null> => {
        try {
            return Category.findOneBy({ name });
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };
}

export class AllCategories implements ListOfCategories {
    public getAllCategories = async (): Promise<Category[]> => {
        try {
            const categories = await Category.find();
            return getImagesWithURLByCategory(categories);
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };

    public getCategoriesToMatch = async(): Promise<Category[]> => {
        try {
            return Category.find({
                select: {
                    uuid: true,
                    name: true
                }
            });
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };
}

export class FindCategory implements CategoryUuidFinder {
    public getCategory = async(uuid: string): Promise<Category | null> => {
        try {
            return Category.findOneBy({ uuid });
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };
}

const getImagesWithURLByCategory = (CategoriesAndTheirImages) => {
    const productUrl: string = config.get('aws.bucketProductUrl');

    const finalCategory = CategoriesAndTheirImages.map(category => {
        const { imageName, ...productWithoutImages } = category;

        return {
            images: `${productUrl}${imageName}`, 
            ...productWithoutImages
        };
    });

    return finalCategory;
};