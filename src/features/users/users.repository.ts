import { QueryResult } from "pg";

import pool from "../../db/postgres";
import { IUser } from "./users.type";

export async function findAllUsers(): Promise<IUser[]> {
    const result = await pool.query<IUser>('SELECT * FROM users');
    return parse(result);
}

// Private functions
async function parse(result: QueryResult<IUser>) {
    return result?.rows?.length ? result.rows : [];
}