import db from "../../mySql";

export const createOrderDetailMysql = async (orderDetailId:number, productId:number, quantity:number) => {
    const [result]: any = await db.query(`INSERT INTO orderdetail (orderDetailId, productId, quantity) VALUES ('${orderDetailId}', '${productId}', '${quantity}')`)
    return result.insertId
}

export const getProductInBillMysql = async (orderDetailId:number) => {
    const [result]: any = await db.query(`SELECT * FROM orders JOIN orderdetail ON orders.orderId = orderdetail.orderDetailId JOIN products ON orderdetail.productId = products.idProduct WHERE orderDetailId = '${orderDetailId}'`)
    return result
}