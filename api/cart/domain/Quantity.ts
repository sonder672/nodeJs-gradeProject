export const Quantity = (quantity: number) => {
    if (quantity == 0)
        throw {
            statusCode: 422,
            message: 'product quantity cannot be 0'
        };

    return quantity;
};