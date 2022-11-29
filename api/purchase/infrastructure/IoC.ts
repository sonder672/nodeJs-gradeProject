import Create from '../app/Create';
import Controller from './Controller';
import { WhatsAppTransporter } from './External';
import { Creator } from './DataAccessObject';
import { FindPrice } from '../../product/infrastructure/DataAccessObjec';

export const createLeadService = new Create(
    new Creator(),
    new WhatsAppTransporter(),
    new FindPrice()
);

export const leadController = new Controller();
