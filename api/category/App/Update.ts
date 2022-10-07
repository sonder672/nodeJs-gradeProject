import { CategoryUpdater, CategoryNameFinder } from '../Repository';

export default class Update {
    constructor(
        private readonly updater: CategoryUpdater,
        private readonly finder: CategoryNameFinder
    ) {}

    public updateCategory = async({uuid, name}: {uuid: string, name: string}): Promise<void> => {
        try {
            const nameCategories = await this.finder.getNameOfCategory(name);

            if (nameCategories)
                throw {
                    statusCode: 400,
                    message: 'The name already exists, choose another for your category'
                };

            await this.updater.updateCategory(
                {uuid: uuid, name: name}
            );
        } catch (error) {
            throw {
                statusCode: error.statusCode,
                message: error.message || error
            };
        }
    };
}