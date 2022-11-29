export interface messageCommunicator {
    sendMessageToWhatsapp({ message, phone }: { message: string; phone: number }): Promise<string>
}