import { QueryResult } from "pg";

import pool from "../../db/postgres";
import { DB_KEY, IPost, PostFilters } from "./posts.type";
import { IQuery } from "../../utils/models";

export async function queryPosts(conditions?: PostFilters): Promise<IPost[]> {
    let clause = '';
    const values: any[] = [];
    const format = (value: string) => ` ${value} `;
    const insert = (value: string) => clause += format(value);
    const insertAND = () => clause ? insert('AND') : '';
    const insertValue = (value: any) => `($${values.push(value)})`;

    if (conditions?.typeOf) {
        insertAND();
        insert(`p.${DB_KEY.category} = ${insertValue(conditions?.typeOf)}`);
    }
    if (conditions?.within) {
        switch (conditions?.within) {
            case 'last-w':
                insertAND();
                insert(`p.${DB_KEY.created_at} >= CURRENT_TIMESTAMP - INTERVAL '7 days'`);
                break;
            case 'last-m':
                insertAND();
                insert(`p.${DB_KEY.created_at} >= CURRENT_TIMESTAMP - INTERVAL '1 month'`);
                break;
            case 'last-6m':
                insertAND();
                insert(`p.${DB_KEY.created_at} >= CURRENT_TIMESTAMP - INTERVAL '6 months'`);
                break;
            case 'last-y':
                insertAND();
                insert(`p.${DB_KEY.created_at} >= CURRENT_TIMESTAMP - INTERVAL '1 year'`);
                break;
            // case 'january':
            //     insertAND();
            //     insert(`p.${DB_KEY.created_at} >= DATE '2026-01-01' AND p.${DB_KEY.created_at} < DATE '2026-02-01'`);
            //     break;
        }
    }
    if (conditions?.ofUser) {
        insertAND();
        insert(`p.${DB_KEY.is_pvt} = 0 OR (p.${DB_KEY.is_pvt} = 1 AND p.${DB_KEY.added_by} = ${insertValue(conditions?.ofUser)})`);
    } else {
        insertAND();
        insert(`p.${DB_KEY.is_pvt} = 0`);
    }

    const selectClause = `SELECT p.${DB_KEY.id}, p.${DB_KEY.caption}, p.${DB_KEY.created_at}, p.${DB_KEY.is_pvt}, p.${DB_KEY.img_url}, p.${DB_KEY.category}, u.${DB_KEY.username} AS ${DB_KEY.added_by} `;
    const fromClause = `FROM posts p `;
    const joinClause = `JOIN users u ON p.${DB_KEY.added_by} = u.${DB_KEY.id} `;
    const whereClause = clause ? `WHERE ${clause}` : '';

    const text = selectClause.concat(fromClause, joinClause, whereClause);

    return execute({ text, values });
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