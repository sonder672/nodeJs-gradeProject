import LeadEntity from './Lead';

export interface leadCreator {
    saveLead(lead: LeadEntity): Promise<void>
}

export interface leadFinder {
    getDetail(uuid: string)
}