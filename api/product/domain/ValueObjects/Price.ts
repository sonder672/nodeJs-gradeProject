export const Price = (price: number) => {
    if (price < 0)
        throw {
            statusCode: 422,
            message: 'El precio no puede tener un valor negativo'
        };

    return price;
};