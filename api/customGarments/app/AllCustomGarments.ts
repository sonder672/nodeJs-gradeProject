import { userFinder } from '../Domain/Repository';

export default class AllCustomGarments {
    constructor(
        private readonly finder: userFinder,
    ){}

    public getByUser = async(uuid: string) => {
        try {
            const customizationByUser = await this.finder.getByUser(uuid);

            return customizationByUser[0].customizations;
        } catch (error) {
            throw {
                statusCode: error.statusCode,
                message: error.message || error
            };
        }
    };
}