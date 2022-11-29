import CustomGarments from './CustomGarments';

export interface customCreator {
    save(customization: CustomGarments): Promise<void>
}

export interface userFinder {
    getByUser(uuid: string)
}