import { Request, Response } from "express";
import {
    addUserMysql,
    getAllUserMysql,
    getUserByIdMysql,
    checkUserByEmailMysql,
    updateStatusUserMysql,
    changeUser,
} from "../services/users.service";
import argon from "argon2";
import { log } from "console";
const jwt = require("jsonwebtoken");

interface LoginRequest {
    id: number;
    email: string;
    password: string;
    role: number; // hoặc có thể là kiểu enum nếu có các giá trị cố định cho role
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUserMysql();
        res.status(200).json({
            message: "Chào mừng",
            data: users,
        });
    } catch (err) {
        console.log(err);
    }
};

export const register = async (req: Request, res: Response) => {
    const { userName, email, phone, password } = req.body;
    const hashedPassword = await argon.hash(password);
    const newId = await addUserMysql(userName, email, phone, hashedPassword);
    if (!newId) {
        return res.status(500).json({
            message: "Đăng kí thất bại",
        });
    } else {
        return res.status(200).json({
            message: "Đăng kí thành công",
        });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password, status } = req.body;
    const findUser: any = await checkUserByEmailMysql(email);
    if (!findUser) {
        return res.status(400).json({
            message: "Tài khoản không tồn tại",
        });
    }
    const checkPass = await argon.verify(findUser.password, password);
    if (!checkPass) {
        return res.status(200).json({
            message: "Mật khẩu không chính xác",
        });
    }
    const token = jwt.sign(
        { id: findUser.id, role: findUser.role },
        process.env.JWT_SECRET
    );
    log(token);
    if (findUser.email === "admin@gmail.com" && findUser.password === "admin") {
        res.status(200).json({
            message: "Xin chào admin",
            token,
            user: findUser,
        });
        return;
    }
    if (findUser.status == 1) {
        res.status(200).json({
            message: "Tài khoản của bạn đã bị khóa",
            token,
            user: findUser,
        });
        return;
    }
    res.status(200).json({
        message: "Đăng nhập thành công",
        token,
        user: findUser,
    });
};

export const updateStatusUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const newUser = req.body;
    if (newUser.status === 0) {
        newUser.status = 1;
        console.log(newUser);
        const user = await changeUser(newUser);
        res.status(200).json({
            message: "Update status thành công",
        });
    } else {
        console.log(newUser);
        newUser.status = 0;
        const user = await changeUser(newUser);
        res.status(200).json({
            message: "Update status thành công",
        });
    }

    // const user = await getUserByIdMysql(Number(id));
    // const user = await changeUser(newUser);
    // res.status(200).json({
    //     message: "Update status thành công",
    // });

    // const newStatus = !user.status;
    // const result = await updateStatusUserMysql(Number(id), String(newStatus));
    // const users = await getAllUserMysql();
    // res.status(200).json({
    //     message: "Update status thành công",
    //     users,
    // });
};
