import { addProduct, deleteProduct, getAllProducts, updateProduct, getProductBySearch, getProductByCategory } from "../controllers/product.controller";
import { Express } from "express";
export const productRoutes = (app: Express) => {
    app.get("/api/product", getAllProducts)
    app.post("/api/product", addProduct)
    app.put("/api/product/:idProduct", updateProduct)
    app.delete("/api/product/:idProduct", deleteProduct)
    app.get("/api/product/search", getProductBySearch)
    app.get("/api/product/category/:id", getProductByCategory)
}