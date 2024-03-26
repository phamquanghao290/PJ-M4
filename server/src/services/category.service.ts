import db from "../../mySql";

export const getAllCategoryMysql = async () => {
    const [result] = await db.query("SELECT * FROM category")
    return result
}

export const addCategoryMysql = async (nameCategory:string) => {
    const [result]: any = await db.query(`INSERT INTO category (nameCategory) VALUES ('${nameCategory}')`)
    return result.insertId
}

export const updateCategoryMysql = async (categoryId:number, nameCategory:string) => {
    const [result]: any = await db.query(`UPDATE category SET nameCategory = '${nameCategory}' WHERE categoryId = '${categoryId}'`);
    return result.insertId
}

export const deleteCategoryMysql = async (categoryId:number) => {
    const [result]: any = await db.query(`DELETE FROM category WHERE categoryId = '${categoryId}'`);
    return result.insertId
}