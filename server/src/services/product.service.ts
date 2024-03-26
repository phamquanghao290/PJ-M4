import db from "../../mySql";

export const getAllProductMysql = async () => {
    const [result] = await db.query(
        "SELECT * FROM products"
    )
    return result
}

export const getProductBySearchMysql = async (search:string) => {
    const [result] = await db.query(
        `SELECT * FROM products WHERE nameProduct LIKE '%${search}%'`
    )
    return result
}

export const addProductMysql = async (nameProduct:string, price:number, discription:string, image:string, stock:number, categoryId:string) => {
    const [result]: any = await db.query(
        `INSERT INTO products (nameProduct, price, discription, image, stock, categoryId) VALUES ('${nameProduct}', '${+price}', '${discription}', '${image}', '${+stock}', '${categoryId}')`
    );
    return result
}

export const updateProductMysql = async (idProduct:number, nameProduct:string, price:number, discription:string, image:string, stock:number, categoryId:string) => {
    const [result]: any = await db.query(
        `UPDATE products SET nameProduct = '${nameProduct}', price = '${+price}', discription = '${discription}', image = '${image}', stock = '${+stock}', categoryId = '${categoryId}' WHERE id = '${idProduct}'`
    );
    return result.insertId
}

export const deleteProductMysql = async (idProduct:any) => {
    const [result] = await db.query(
        `DELETE FROM products WHERE idProduct = '${idProduct}'`
    );
    return result
}

export const updateStockProductMysql = async (idProduct:number, stock:number) => {
    const [result] = await db.query(
        `UPDATE products SET stock = '${+stock}' WHERE idProduct = '${idProduct}'`
    );
    return result
}

export const getProductByCategoryMysql = async (id:number) => {
    if(id == 0 ){
        const [result] = await db.query(`SELECT * FROM products`)
        return result
    } else {
        const [result] = await db.query(`SELECT * FROM products WHERE categoryId = '${id}'`)
        return result
    }
}