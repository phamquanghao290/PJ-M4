import { log } from "console";
import db from "../../mySql";

export const getCartByUserIdMysql = async (userId: number) => {
    const [result] = await db.query(
        `SELECT * FROM cart JOIN products ON cart.productId = products.idProduct JOIN category ON products.categoryId = category.categoryId WHERE userId = '${userId}'`
        
    );
    return result;
};

export const checkProductInCartMysql = async (userId: string, productId: any) => {
    const [result]: any = await db.query(
        `SELECT * FROM cart WHERE userId = '${userId}' AND productId = '${productId}'`
    );
    return result[0];
};

export const addToCartMysql = async (userId: number, newProduct: any) => {
    const [result]: any = await db.query(
        `INSERT INTO cart (userId, productId, quantity) VALUES ('${userId}', '${newProduct.idProduct}', '1')`
    );
    return result.insertId;
};

export const updateQuantity = async (userId: number, productId: number) => {
    const [result]: any = await db.query(
        `UPDATE cart SET quantity = quantity + 1 WHERE userId = '${userId}' AND productId = '${productId}'`         
    );
    return result.insertId;
};

export const deleteProductInCartMysql = async (userId: number,newProduct: any) => {
    const [result]: any = await db.query(
        `DELETE FROM cart WHERE userId = '${userId}' AND productId = '${newProduct.idProduct}'`
    );
    return result.insertId;
};

export const increaseQuantity = async (cartId: number, type: string) => {
    if (type == "increase") {
        const [result] = await db.query(
            `UPDATE cart SET quantity = quantity + 1 WHERE cartId = '${cartId}'`
        );
        return result;
    } else {
        const [result] = await db.query(
            `UPDATE cart SET quantity = quantity - 1 WHERE cartId = '${cartId}'`
        );
        return result;
    }
};

export const deleteCartMysql = async (cartId: number) => {
    const [result] = await db.query(
        `DELETE FROM cart WHERE cartId = '${cartId}'`
    );
    return result;
};
