import db from "../../mySql";

export const getAllOrdersByIdMysql = async (userId: number) => {
    const [result]: any = await db.query(
        `SELECT * FROM orders WHERE userId = '${userId}'`
    );
    return result;
};

export const getAllOrdersByAdminMysql = async () => {
    const [result]: any = await db.query(
        `SELECT * FROM orders JOIN users ON orders.userId = users.id`
    );
    return result;
};

export const createOrderMysql = async (
    userId: number,
    address: string,
    phone: string,
    total: number
) => {
    const [result]: any = await db.query(
        `INSERT INTO orders (userId, address, phone, total, createdAt) VALUES ('${userId}', '${address}', '${phone}', '${total}', CURRENT_TIMESTAMP())`
    );
    return result.insertId;
};

export const updateStatus = async (orderId: number, status: string) => {
    const [result]: any = await db.query(
        `UPDATE orders SET status_order = '${status}' WHERE orderId = '${orderId}'`
    );
    return result.insertId;
};

export const deleteOrderMysql = async (orderId: number) => {
    const [result] = await db.query(
        `DELETE FROM orders WHERE orderId = '${orderId}'`
    );
    return result;
};
