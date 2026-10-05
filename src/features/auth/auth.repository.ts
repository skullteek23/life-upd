import { QueryResult } from "pg";

import pool from "../../db/postgres";
import { IUser } from "./auth.type";
import { IQuery } from "../../utils/types";

export function findUserByUsername(username: string): Promise<QueryResult<any>> {
    const query = {
        text: 'SELECT * FROM users WHERE username = ($1)',
        values: [username]
    }
    return execute(query);
}

export function addUser(user: Partial<IUser>): Promise<QueryResult<any>> {
    const query = {
        text: 'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *',
        values: [user.username, user.password_hash]
    };
    return execute(query);
}

// Private functions
async function execute(query: IQuery): Promise<QueryResult<any>> {
    const result = await pool.query(query);
    return result;
}
