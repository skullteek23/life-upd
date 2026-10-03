import { QueryResultRow, QueryResult } from "pg";

import pool from "../../db/postgres";
import { IPost, IQuery } from "./posts.type";

export async function findAllPosts(): Promise<IPost[]> {
    const result = await pool.query<IPost>('SELECT * FROM POSTS WHERE is_pvt = 0');
    return parse(result);
}

export async function findPostsByUserId(id: number): Promise<IPost[]> {
    // Parameterized query 
    // helps prevent SQL injection
    // provided by node-postgres
    const query = {
        text: 'SELECT * FROM posts WHERE is_pvt = 0 OR (is_pvt = 1 AND added_by = $1); ',
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