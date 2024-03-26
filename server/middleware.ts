import { checkUserByEmailMysql } from "./src/services/users.service";
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import { log } from "console";
dotenv.config();

export const checkEmailExist = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const email = await checkUserByEmailMysql(req.body.email);
    if (email) {
        return res.status(400).json({
            message: "Email đã được đăng kí",
        });
    }
    next();
};

export const checkEmpty = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password, status } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Không được để trống",
        });
    }
    if(status === 0){
        return res.status(401).json({
            message: "Tài khoản đã bị khóa"
        })
    }
    next();
};

export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(400).json({message: "Không tìm thấy token"});
    }
    jwt.verify(token,process.env.JWT_SECRET, (err: any, data: any) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({message: "Token đã hết hạn"});        
            } else {
                return res.status(403).json({message: "Sai token"});
            }
        }
        if (data.role != 1) {
                return res.status(403).json({
                    message: "Bạn không thể làm việc này",
                });
            }
        next();
    });
};
