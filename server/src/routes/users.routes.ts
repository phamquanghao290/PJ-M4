import { Express } from "express";
import {
    register,
    getAllUsers,
    login,
    updateStatusUser,
} from "../controllers/users.controller";
import { checkEmailExist, checkEmpty } from "../../middleware";
import { verifyToken } from "../../middleware";

export const userRouter = (app: Express) => {
    app.get("/api/users", getAllUsers);
    app.post("/api/register", checkEmailExist, register);
    app.post("/api/login", login);
    app.patch("/api/user/:id", updateStatusUser);
};
