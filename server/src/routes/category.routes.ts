import { getAllCategory, addCategory, updateCategory, deleteCategory } from "../controllers/category.controller";
import { Express } from "express";

export const categoryRoutes = (app: Express) => {
    app.get("/api/category", getAllCategory)
    app.post("/api/category", addCategory)
    app.put("/api/category/:id", updateCategory)
    app.delete("/api/category/:id", deleteCategory)
}