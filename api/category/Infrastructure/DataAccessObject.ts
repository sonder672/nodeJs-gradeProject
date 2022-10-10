import { Category } from '../../../models/Category';
import { CategoryCreator, CategoryFinder, CategoryNameFinder, CategoryUpdater, ListOfCategories } from '../Repository';
import CategoryEntity from '../Category';

export class Creator implements CategoryCreator {
    public saveCategory = async (category: CategoryEntity): Promise<void> => {
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

export class FindCategory implements CategoryFinder {
    public getCategory = async(uuid: string): Promise<boolean> => {
        const category = await Category.findOneBy({ uuid });
        if (!category) 
            return false;
        
        return true;
    };

}