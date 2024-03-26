import { Request, Response } from 'express';
import { getAllOrdersByAdminMysql, getAllOrdersByIdMysql, createOrderMysql, updateStatus, deleteOrderMysql } from "../services/order.service";
import { updateStockProductMysql } from "../services/product.service";
import { getProductInBillMysql } from '../services/orderDetail.service';
import { log } from 'console';


export const getAllOrdersById = async (req:Request, res:Response) => {
    const { userId } = req.params
    const orders = await getAllOrdersByIdMysql(Number(userId));
    res.status(200).json(orders)
}

export const getAllOrdersByAdmin = async (req:Request, res:Response) => {
    const result = await getAllOrdersByAdminMysql()
    res.status(200).json(result)
}

export const createOrder = async (req:Request, res:Response) => {
    const { userId, address, phone, total } = req.body
    const result = await createOrderMysql(userId, address, phone, total)
    res.status(201).json({message: "Đặt hàng thành công", result})
}

export const updateStatusOrder = async (req:Request, res:Response) => {
    const { id } = req.params
    const { status } = req.body
    log("trạng thái", status)
    const productInOrder: any = await getProductInBillMysql(Number(id));
    const result = await updateStatus(Number(id), status);
    if(status == "Đang xử lý") {
        await Promise.all(productInOrder.map(async (product:any) => 
            await updateStockProductMysql(product.idProduct, product.stock)
        ))
    }
    const orders = await getAllOrdersByAdminMysql()
    res.status(200).json({
        message: "Cập nhật đơn hàng thành công",
        orders
    })
}

export const deleteOrder = async (req:Request, res:Response) => {
    const { id } = req.params
    const result = await deleteOrderMysql(Number(id))
    res.status(200).json({message: "Xóa đơn hàng thành công", result})
}