import Category from '../Domain/Category';
import { CategoryUpdater, CategoryNameFinder, CategoryUuidFinder } from '../Domain/Repository';
import FindCategoryName from './FindCategoryName';
import FindCategoryUuid from './FindCategoryUuid';

export default class Update {
    constructor(
        private readonly updater: CategoryUpdater,
        private readonly nameFinder: CategoryNameFinder,
        private readonly uuidFinder: CategoryUuidFinder
    ) {}

    public updateCategory = async({uuid, name}: {uuid: string, name: string}): Promise<void> => {
        try {
            const categoryUuid = new FindCategoryUuid(this.uuidFinder);
            await categoryUuid.existingCategoryUuid(uuid);

            const categoryName = new FindCategoryName(this.nameFinder);
            await categoryName.existingCategoryName(name);

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