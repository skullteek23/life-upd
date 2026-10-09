import { randomUUID } from 'crypto';
import { addPost, postsForEveryone, postsForUser } from "./posts.repository";
import { Category, ERROR_CODES, IPost, ImageFile } from "./posts.type";
import { processImage } from 'src/utils/img-processing';
import { IStatus } from 'src/utils/models';

export const MAX_INPUT_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
export const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heif', 'image/heic'];

export async function getPosts(userId: number): Promise<IPost[]> {
    let posts: IPost[] = [];
    if (userId) {
        posts = await postsForUser(userId);
    } else {
        posts = await postsForEveryone();
    }
    return sortPosts(posts);
}

export async function uploadPost(data: Partial<IPost>, file: any, userId: number): Promise<IStatus> {
    const status: IStatus = { error: '', response: null };

    status.error = !data || !userId || !file || !isFileValid(file) || !isBodyValid(data) ? 'Invalid payload' : '';
    if (status.error) {
        return status;
    }

    data.added_by = userId;

    const fileName = `${randomUUID()}.jpg`;
    const fileBuffer = (file as ImageFile).buffer;
    status.error = !fileName ? 'Invalid file name' : '';
    if (status.error) {
        return status;
    }

    try {
        const publicUrl = await processImage(fileBuffer, fileName);
        data.img_url = (typeof publicUrl === 'string' && publicUrl?.length) ? publicUrl : '';
    } catch (error) {
        if (error instanceof Error && error.message === ERROR_CODES.compressionAborted) {
            status.error = 'Try with another image';
        } else {
            status.error = ERROR_CODES.imageProcessingError;
        }
    }
    if (status.error) {
        return status;
    }

    try {
        await addPost(data);
        status.error = '';
    } catch (error) {
        status.error = 'Post upload error';
    }
    return status;
}

function sortPosts(data: IPost[]): IPost[] {
    return data.sort((a, b) => (new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
}

export function isFileValid(file: ImageFile): boolean {
    if (file.buffer && file.size <= MAX_INPUT_FILE_SIZE && allowedTypes.includes(file.mimetype)) {
        return true;
    }
    return false;
}

function isBodyValid(data: Partial<IPost>): boolean {
    const isCaptionValid = data.caption ? data.caption.trim()?.length : true;
    const isCategoryValid = data.category && Object.keys(Category).includes(data.category) && data.category.length === 3;
    const isVisibilityValid = Number(data.is_pvt) === 0 || Number(data.is_pvt) === 1;
    if (isCaptionValid && isCategoryValid && isVisibilityValid) {
        return true;
    } else return false;
}