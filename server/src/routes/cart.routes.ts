import { getCartByUserId, addToCart, deleteProductInCart, changeQuantity } from "../controllers/cart.controller";
import { Express } from "express";

export const cartRoutes = (app: Express) => {
    app.get("/api/cart/:userId", getCartByUserId)
    app.post("/api/cart/:userId", addToCart)
    app.delete("/api/cart/:cartId", deleteProductInCart)
    app.patch("/api/cart/", changeQuantity)
}