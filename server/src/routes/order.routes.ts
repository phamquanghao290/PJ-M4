import { Express } from "express";
import {
    getAllOrdersById,
    getAllOrdersByAdmin,
    createOrder,
    updateStatusOrder,
    deleteOrder,
} from "../controllers/order.controller";

import { verifyToken } from "../../middleware";

export const orderRoutes = (app: Express) => {
    app.get("/api/order", getAllOrdersByAdmin);
    app.get("/api/orders/:userId", getAllOrdersById);
    app.post("/api/order", createOrder);
    app.put("/api/status/:id", updateStatusOrder);
    app.delete("/api/order/:id", deleteOrder);
};
