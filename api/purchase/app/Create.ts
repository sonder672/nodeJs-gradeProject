import { leadCreator } from '../domain/Repository';
import { messageCommunicator } from '../domain/External';
import { Cart } from '../../cart/domain/Cart';
import LeadEntity from '../domain/Lead';
import { FindPrice } from '../../product/infrastructure/DataAccessObjec';

export default class Create {
    constructor(
        private readonly creator: leadCreator,
        private readonly communicator: messageCommunicator,
        private readonly priceFinder: FindPrice
    ){}

    public saveLead = async({cartContent, phone}: {cartContent, phone: number}) => {
        try {
            if (cartContent === null) {
                return await this.communicator.sendMessageToWhatsapp({
                    message: '¡Hola, vengo de la página web! Aún no he añadido ningún producto, pero estoy interesado en conocer más acerca de sus productos', 
                    phone
                });
            }

            if (cartContent.length < 2) {
                return await this.convertCartContentToMessage(cartContent, phone);
            }

            return await this.convertCartContentsToMessage(cartContent, phone);
        } catch (error) {
            throw {
                statusCode: error.statusCode,
                message: error.message
            };
        }
    };

    private convertCartContentToMessage = async (cartContent, phone: number) => {
        try {
            let priceProduct = 1;
            if (cartContent[0].name != 'Camiseta personalizada') {
                priceProduct = await this.priceFinder.getPrice(cartContent[0].uuid);
            }
            
            const cart = new Cart(
                cartContent[0].quantity,
                cartContent[0].uuid,
                priceProduct,
                cartContent[0].image
            );

            if (cartContent[0].name != 'Camiseta personalizada') {
                const lead = new LeadEntity(cart, phone);
                await this.creator.saveLead(lead);
            }
            
            const message = `¡Hola! Vengo de la página web y me interesa comprar: ${cart.quantity} ${cartContent[0].name} por tan solo $${cart.price}. Imagen de referencia: ${cart.image}`;

            return await this.communicator.sendMessageToWhatsapp({message, phone});
        } catch (error) {
            throw {
                statusCode: error.statusCode,
                message: error.message
            };
        }
    };

    private convertCartContentsToMessage = async (cartContent, phone: number) => {
        try {
            const cart = cartContent.map(async cart => {
                let priceProduct = 1;
                if (cart.name != 'Camiseta personalizada') {
                    priceProduct = await this.priceFinder.getPrice(cart.uuid);
                }
                
                const cartContent = new Cart(
                    cart.quantity,
                    cart.uuid,
                    priceProduct,
                    cart.image
                );

                if (cart.name != 'Camiseta personalizada') {
                    const lead = new LeadEntity(cartContent, phone);
                    await this.creator.saveLead(lead);
                }

                return ` ${cart.quantity} ${cart.name} por tan solo $${cart.price}. Imagen de referencia: ${cart.image}`;
            });

            const orders = await Promise.all(cart);
            const message = `¡Hola! Vengo de la página web y me interesa comprar:${orders}`;
            return await this.communicator.sendMessageToWhatsapp({message, phone});
        } catch (error) {
            throw {
                statusCode: error.statusCode,
                message: error.message
            };
        }
    };
}