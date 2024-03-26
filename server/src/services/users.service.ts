import db from "../../mySql";

export const addUserMysql = async (
    name: string,
    email: string,
    phone: string,
    password: string
) => {
    const [result]: any = await db.query(
        `INSERT INTO users (userName, email, phone, password) VALUES ('${name}', '${email}', '${phone}', '${password}')`
    );
    return result.insertId;
};

export const getAllUserMysql = async () => {
    const [result] = await db.query("SELECT * FROM users");
    return result;
};

export const getUserByIdMysql = async (id: number) => {
    console.log(id);
    const [result]: any = await db.execute(`SELECT * FROM users WHERE id = ?`, [
        id,
    ]);
    return result[0];
};

export const checkUserByEmailMysql = async (email: string) => {
    const [result]: any = await db.query(
        `SELECT * FROM users WHERE email = '${email}'`
    );
    return result[0];
};

export const updateStatusUserMysql = async (id: number, status: string) => {
    console.log("yyyyy", id, status);
    const [result]: any = await db.query(
        `UPDATE users SET status = '${status}' WHERE id = '${id}'`
    );
    return result.insertId;
};

export const changeUser = async (user: any) => {
    const [result]: any = await db.query(
        `UPDATE users SET status = '${user.status}' WHERE id = '${user.id}'`
    );
    return;
};
