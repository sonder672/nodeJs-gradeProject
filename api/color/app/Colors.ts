import { ListOfColor } from '../domain/Repository';
export default class Colors {
    constructor(private readonly lister: ListOfColor) {}

    public getAllColors = async() => {
        try {
            const colors = await this.lister.getAllColors();

            return colors;
        } catch (error) {
            throw {
                statusCode: error.statusCode,
                message: error.message || error
            };
        }
    };
}