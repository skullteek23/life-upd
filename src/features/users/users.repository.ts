import { QueryResult } from "pg";

import pool from "../../db/postgres";
import { IUser } from "./users.type";
import { IQuery } from "../../utils/types";

export async function findAllUsers(): Promise<IUser[]> {
    const result = await pool.query<IUser>('SELECT * FROM users');
    return parse(result);
}

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


// Private functions
async function execute(query: IQuery): Promise<QueryResult<any>> {
    const result = await pool.query(query);
    return result;
}

async function parse(result: QueryResult<IUser>) {
    return result?.rows?.length ? result.rows : [];
}