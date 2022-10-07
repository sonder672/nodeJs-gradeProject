import { Category } from '../../../models/Category';
import { CategoryCreator, CategoryNameFinder, CategoryUpdater, ListOfCategories } from '../Repository';

export class Creator implements CategoryCreator {
    public saveCategory = async (category: { uuid: string; name: string; }): Promise<void> => {
        try {
            await Category.insert(category);
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };
}

export class Updater implements CategoryUpdater {
    public updateCategory = async (category: { uuid: string; name: string; }): Promise<void> => {
        const {uuid, name} = category;
        try {
            await Category.update({ uuid }, { name });
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };
}

export class CategoryName implements CategoryNameFinder {
    public getNameOfCategory = async (name: string): Promise<boolean> => {
        const categoryName = await Category.findOneBy({ name });

        if (!categoryName) 
            return false;

        return true;
    };
}

export class AllCategories implements ListOfCategories {
    public getAllCategories = async (): Promise<Category[]> => {
        try {
            return await Category.find();
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };
}