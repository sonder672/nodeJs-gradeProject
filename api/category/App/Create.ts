import Category from '../Category';
import { CategoryCreator, CategoryNameFinder } from '../Repository';

export default class Create {
    constructor(
        private readonly creator: CategoryCreator, 
        private readonly finder: CategoryNameFinder
    ){}

    public saveCategory = async(name: string): Promise<void> => {
        try {
            const nameCategories = await this.finder.getNameOfCategory(name);

            if (nameCategories)
                throw {
                    statusCode: 400,
                    message: 'The name already exists, choose another for your category'
                };

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