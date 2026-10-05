import { QueryResult } from "pg";

import pool from "../../db/postgres";
import { IPost } from "./posts.type";
import { IQuery } from "../../utils/types";

export async function postsForEveryone(): Promise<IPost[]> {
    const result = await pool.query<IPost>(`
        SELECT
            p.id,
            p.caption,
            p.created_at,
            p.is_pvt,
            p.img_url,
            p.category,
            u.username AS added_by
        FROM posts p
        JOIN users u
            ON p.added_by = u.id
        WHERE p.is_pvt = 0;`);
    return parse(result);
}

export async function postsForUser(id: number): Promise<IPost[]> {
    // Parameterized query 
    // helps prevent SQL injection
    // provided by node-postgres
    const query = {
        text: `
        SELECT
            p.id,
            p.caption,
            p.is_pvt,
            p.created_at,
            p.img_url,
            p.category,
            u.username AS added_by
        FROM posts p
        JOIN users u
            ON p.added_by = u.id
        WHERE p.is_pvt = 0 OR (p.is_pvt = 1 AND p.added_by = $1);`,
        values: [id]
    }
    return execute(query);
}

export async function addPost(post: Partial<IPost>): Promise<IPost[]> {
    const query = {
        text: 'INSERT INTO posts (added_by, img_url, caption, category, is_pvt) VALUES ($1, $2, $3, $4, $5)',
        values: [post.added_by, post.img_url, post.caption, post.category, post.is_pvt]
    };

    return execute(query);
}

// Private functions
async function execute(query: IQuery): Promise<IPost[]> {
    const result = await pool.query<IPost>(query);
    return parse(result);
}

async function parse(result: QueryResult<IPost>) {
    return result?.rows?.length ? result.rows : [];
}