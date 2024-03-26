import { Express } from "express"; 
import { createOrderDetail, getProductInBill } from "../controllers/orderDetail.controller";

export const orderDetailRoutes = (app: Express) => {
    app.post("/api/orderDetail", createOrderDetail)
    app.get("/api/orderDetail/:orderDetailId", getProductInBill)
}