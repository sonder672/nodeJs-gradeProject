import { Lead } from '../../../models/Lead';
import LeadEntity from '../domain/Lead';
import { leadCreator } from '../domain/Repository';

export class Creator implements leadCreator {
    public saveLead = async (lead: LeadEntity): Promise<void> => {
        try {
            await Lead.insert({
                uuid: lead.uuid,
                product: lead['cartContent'].productUuid,
                quantity: lead['cartContent'].quantity
            });
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };
}