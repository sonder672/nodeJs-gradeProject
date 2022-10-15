export const Stock = (stock: number) => {
    if (stock < 0)
        throw {
            statusCode: 400,
            message: 'the stock of product cannot be less than 0'
        };

    return stock;
};