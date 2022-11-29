import { User } from '../../../../models/User';

export const getRoleByUuid = async (uuid: string) => {
    try {
        const userRole = await User.find({
            where: {
                uuid,
            },
            select: ['role']
        });

        return <any>userRole;
    } catch(error) {
        throw {
            statusCode: 500,
            message: error.message || error
        };
    }
};