import { log } from "console";
import {
    addToCartMysql,
    checkProductInCartMysql,
    deleteProductInCartMysql,
    getCartByUserIdMysql,
    increaseQuantity,
    updateQuantity,
    deleteCartMysql,
} from "../services/cart.service";
import { Request, Response } from "express";

export const getCartByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await getCartByUserIdMysql(Number(userId));
    res.status(200).json(result);
};

export const addToCart = async (req: Request, res: Response) => {
    const check = await checkProductInCartMysql(
        req.params.userId,
        req.body.idProduct
    );
    if (!check) {
        await addToCartMysql(Number(req.params.userId), req.body);
        log(req.body);
        res.status(201).json({ message: "Thêm vào giỏ hàng thành công" });
    } else{
        await updateQuantity(Number(req.params.userId), req.body.idProduct);
        res.status(200).json({message: "Cập nhật số lượng trong giỏ hàng thành công"})     
    }
};

export const deleteProductInCart = async (req: Request, res: Response) => {
    const { cartId } = req.params;
    const result = await deleteCartMysql(Number(cartId));
    res.status(200).json({ message: "Xoá thành công" });
};

export const changeQuantity = async (req: Request, res: Response) => {
    const { cartId, type } = req.body;
    const result = await increaseQuantity(Number(cartId), type);
    res.status(200).json({
        message: "Cập nhật số lượng trong giỏ hàng thành công",
    });
};
