import Category from '../domain/Category';
import { CategoryCreator, CategoryNameFinder } from '../domain/Repository';
import FindCategoryName from './FindCategoryName';

export default class Create {
    constructor(
        private readonly creator: CategoryCreator, 
        private readonly nameFinder: CategoryNameFinder
    ){}

    public saveCategory = async(name: string): Promise<void> => {
        try {
            const categoryName = new FindCategoryName(this.nameFinder);
            await categoryName.existingCategoryName(name);

            const categoryEntity = new Category(name);

            await this.creator.saveCategory(categoryEntity);
        } catch (error) {
            throw {
                statusCode: error.statusCode,
                message: error.message || error
            };
        }
    };
}