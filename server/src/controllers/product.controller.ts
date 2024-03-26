import { Express, Request, Response } from "express";
import {
    getAllProductMysql,
    addProductMysql,
    getProductBySearchMysql,
    updateProductMysql,
    deleteProductMysql,
    getProductByCategoryMysql,
} from "../services/product.service";

export const getAllProducts = async (req: Request, res: Response) => {
    const result = await getAllProductMysql();
    res.status(200).json(result);
};

export const getProductByCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getProductByCategoryMysql(+id);
    res.status(200).json(result);
};

export const addProduct = async (req: Request, res: Response) => {
    const { nameProduct, price, discription, image, stock, categoryId } =
        req.body;
    const result = await addProductMysql(
        nameProduct,
        +price,
        discription,
        image,
        stock,
        categoryId
    );
    if (!result) {
        return res.status(500).json({
            message: "Có lỗi khi thêm sản phẩm",
        });
    }
    const products = await getAllProductMysql();
    res.status(200).json({
        message: "Thêm sản phẩm thành công",
        products,
    });
    res.status(200).json(result);
};

export const updateProduct = async (req: Request, res: Response) => {
    const { nameProduct, price, discription, image, stock, categoryId } =
        req.body;
    const { idProduct } = req.params;
    const result = await updateProductMysql(
        +idProduct,
        nameProduct,
        price,
        discription,
        image,
        stock,
        categoryId
    );
    const products = await getAllProductMysql();
    res.status(200).json({
        message: "Thay đổi sản phẩm thành công",
        products,
    });
    res.status(200).json(result);
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { idProduct } = req.params;
    const result = await deleteProductMysql(+idProduct);
    if (!result) {
        return res.status(500).json({
            message: "Có lỗi khi xóa sản phẩm",
        });
    }
    const products = await getAllProductMysql();
    res.status(200).json({
        message: "Xóa sản phẩm thành công",
        products,
    });
    res.status(200).json(result);
};

export const getProductBySearch = async (req: Request, res: Response) => {
    const { search } = req.query;
    const result = await getProductBySearchMysql(search as string);
    res.status(200).json(result);
};
