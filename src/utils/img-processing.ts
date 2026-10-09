import fs from 'fs/promises';
import sharp from 'sharp';
import path from 'path';
import { ERROR_CODES } from '../features/posts/posts.type';

const MAX_OUTPUT_FILE_SIZE = 1 * 100 * 1024; // 1 MB
const MAX_WIDTH = 700;
const MAX_HEIGHT = 1000;

const UPLOAD_DIR = path.join(
    process.cwd(),
    'uploads',
);

export async function processImage(input: Buffer, name: string): Promise<string> {
    // Small images: process once without the compression loop
    if (input.length <= MAX_OUTPUT_FILE_SIZE) {
        const output = await sharp(input)
            .rotate()
            .jpeg({ quality: 90 })
            .toBuffer();

        return saveImage(name, output);
    }

    // Large images: process until max allowed size is reached the compression loop
    let quality = 80;
    let width = MAX_WIDTH;
    let height = MAX_HEIGHT;
    while (quality >= 30) {

        const output = await sharp(input)
            .rotate()
            .resize(width, height, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .jpeg({
                quality,
                mozjpeg: true
            })
            .toBuffer();

        if (output.length <= MAX_OUTPUT_FILE_SIZE) {
            return saveImage(name, output);
        }

        // First try reducing quality
        quality -= 10;

        // Once quality gets low, reduce dimensions
        if (quality < 50) {
            width = Math.floor(width * 0.8);
            height = Math.floor(height * 0.8);
            quality = 70;
        }
    }

    throw new Error(ERROR_CODES.imageProcessingError);
}

export async function saveImage(filename: string, image: Buffer<ArrayBuffer> | Buffer) {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    await fs.writeFile(path.join(UPLOAD_DIR, filename), image);

    // URL that can be stored in PostgreSQL
    return filename;
}