import {messageCommunicator} from '../domain/External';

export class WhatsAppTransporter implements messageCommunicator {

    public sendMessageToWhatsapp = ({ message, phone }: {message:string; phone: number;}): Promise<string> => {
        return new Promise(resolve => {
            resolve(`https://api.whatsapp.com/send?phone=${phone}&text=${message}`);
        });
    };
}