import Category from '../domain/Category';
import { CategoryUpdater, CategoryNameFinder, CategoryUuidFinder } from '../domain/Repository';
import FindCategoryName from './FindCategoryName';
import FindCategoryUuid from './FindCategoryUuid';

export default class Update {
    constructor(
        private readonly updater: CategoryUpdater,
        private readonly nameFinder: CategoryNameFinder,
        private readonly uuidFinder: CategoryUuidFinder
    ) {}

    public updateCategory = async ({uuid, name}: {uuid: string, name: string}): Promise<void> => {
        const categoryUuid = new FindCategoryUuid(this.uuidFinder);
        const categoryName = new FindCategoryName(this.nameFinder);

        try {
            await Promise.all([
                categoryUuid.existingCategoryUuid(uuid),
                categoryName.existingCategoryName(name)
            ]);  

            const categoryEntity = new Category(name, 'image');
            delete categoryEntity[uuid];
            this.updater.updateCategory({
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