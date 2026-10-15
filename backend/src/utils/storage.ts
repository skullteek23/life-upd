import fs from 'fs/promises';
import path from 'path';
import { createClient } from '@supabase/supabase-js'
import { POST_ERRORS } from './constants';

export async function saveImage(file: Buffer<ArrayBuffer> | Buffer, path: string) {
    const BUCKET = process.env.SUPABASE_BUCKET || '';
    if (BUCKET) {
        const { data, error } = await supabase().storage.from(BUCKET).upload(path, file, {
            contentType: 'image/jpeg',
            upsert: false
        })
        if (error) {
            throw new Error(POST_ERRORS.uploadFailed);
        } else {
            return data;
        }
    } else {
        return saveLocally(path, file);
    }
}

export function getUrl(filename: string): string {
    const BUCKET = process.env.SUPABASE_BUCKET || '';
    if (BUCKET) {
        const result = supabase().storage.from(BUCKET).getPublicUrl(filename);
        return result?.data?.publicUrl || '';
    } else {
        const port = process.env.PORT;
        const localUrl = 'http://localhost:' + port;
        return `${localUrl}/${filename} `;
    }
}

async function saveLocally(filename: string, image: Buffer<ArrayBuffer> | Buffer) {
    const LOCAL_UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(LOCAL_UPLOAD_DIR, { recursive: true });

    await fs.writeFile(path.join(LOCAL_UPLOAD_DIR, filename), image);

    // URL that can be stored in PostgreSQL
    return filename;
}

function supabase() {
    const URL = process.env.SUPABASE_URL || '';
    const API_KEY = process.env.SUPABASE_API_KEY || '';
    return createClient(URL, API_KEY);
}