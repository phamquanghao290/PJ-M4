import { createOrderDetailMysql, getProductInBillMysql } from "../services/orderDetail.service";
import { Request, Response } from "express";
import { log } from "console";

export const createOrderDetail = async (req:Request, res:Response) => {
    const { orderDetailId, cart } = req.body
    console.log(orderDetailId, cart);
    await Promise.all(cart.map(async (product:any) => await createOrderDetailMysql(orderDetailId, product.productId, product.quantity)))
    res.status(201).json({message: "Tạo hóa đơn thành công"})
}

export const getProductInBill = async (req:Request, res:Response) => {
    const { orderDetailId } = req.params
    log(orderDetailId)
    const result = await getProductInBillMysql(Number(orderDetailId))
    res.status(200).json(result)
}