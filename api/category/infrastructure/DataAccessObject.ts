import { Category } from '../../../models/Category';
import { CategoryCreator, CategoryUuidFinder, CategoryNameFinder, CategoryUpdater, ListOfCategories } from '../domain/Repository';
import CategoryEntity from '../domain/Category';

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
            return Category.find();
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