import Category from '../Category';
import { CategoryUpdater, CategoryNameFinder, CategoryFinder } from '../Repository';

export default class Update {
    constructor(
        private readonly updater: CategoryUpdater,
        private readonly nameFinder: CategoryNameFinder,
        private readonly uuidFinder: CategoryFinder
    ) {}

    public updateCategory = async({uuid, name}: {uuid: string, name: string}): Promise<void> => {
        try {
            const categoryExists = await this.uuidFinder.getCategory(uuid);

            if (!categoryExists)
                throw {
                    statusCode: 404,
                    message: 'the identifier does not correspond to any category'
                };

            const existingCategoryName = await this.nameFinder.getNameOfCategory(name);

            if (existingCategoryName)
                throw {
                    statusCode: 400,
                    message: 'The name already exists, choose another for your category'
                };

            const categoryEntity = new Category(name);
            delete categoryEntity[uuid];
            await this.updater.updateCategory({
                uuid, 
                category: categoryEntity
            });
        } catch (error) {
            throw {
                statusCode: error.statusCode,
                message: error.message || error
            };
        }
    };
}