export const Price = (price: number) => {
    if (price < 0)
        throw {
            statusCode: 400,
            message: 'the price cannot be negative'
        };

    return price;
};