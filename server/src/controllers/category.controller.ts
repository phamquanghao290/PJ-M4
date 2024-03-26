import {
    getAllCategoryMysql,
    addCategoryMysql,
    updateCategoryMysql,
    deleteCategoryMysql,
} from "../services/category.service";
import { Request, Response } from "express";

export const getAllCategory = async (req: Request, res: Response) => {
    const result = await getAllCategoryMysql();
    res.status(200).json(result);
};

export const addCategory = async (req: Request, res: Response) => {
    const { nameCategory } = req.body;
    const result = await addCategoryMysql(nameCategory);
    console.log("cate", result);
    // check xem category đã tồn tại hay chưa
    if (nameCategory === "") {
        const categories = await getAllCategoryMysql();
        res.status(400).json({
            message: "Vui lòng nhập dữ liệu",
            categories,
        });
    } else if(nameCategory !== nameCategory) {
        const categories = await getAllCategoryMysql();
        res.status(400).json({
            message: "Category đã tồn tại",
            categories,
        });
    } else {
        const categories = await getAllCategoryMysql();
        res.status(200).json({
            message: "Thêm category thành công",
            categories,
        });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    const { nameCategory } = req.body;
    const { id } = req.params;
    const result = await updateCategoryMysql(Number(id), nameCategory);
    const categories = await getAllCategoryMysql();
    res.status(200).json({
        message: "Thay đổi category thành công",
        categories,
    });
};

export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteCategoryMysql(Number(id));
    const categories = await getAllCategoryMysql();
    res.status(200).json({
        message: "Xóa category thành công",
        categories,
    });
};
