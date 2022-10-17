export const Stock = (stock: number) => {
    if (stock < 0)
        throw {
            statusCode: 422,
            message: 'Las existencias del producto no pueden ser menor a 0'
        };

    return stock;
};