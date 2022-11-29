import Create from '../app/Create';
import AllCustomGarments from '../app/AllCustomGarments';
import { Creator, getCustomGarments } from './DataAccessObject';
import Controller from './Controller';

export const createCustomService = new Create(
    new Creator(), 
);

export const allCustomGarmentsService = new AllCustomGarments(
    new getCustomGarments()
);

export const customController = new Controller();