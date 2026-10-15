import { randomUUID } from 'crypto';
import { addPost, queryPosts } from "./posts.repository";
import { Category, IPost, ImageFile, PostFilters } from "./posts.type";
import { processImage } from '@utils/img-processing';
import { POST_ERRORS } from '@utils/constants';
import { getUrl } from '@utils/storage';

export const MAX_INPUT_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
export const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heif', 'image/heic'];

export async function getPosts(queryParams: any): Promise<IPost[]> {
    let posts: IPost[] = [];
    const filters: PostFilters = queryParams;
    filters.within = queryParams['within'];
    filters.typeOf = queryParams['typeOf'];
    filters.ofUser = queryParams['userId'];
    posts = await queryPosts(filters);
    return sortPosts(posts);
}

export async function uploadPost(data: Partial<IPost>, file: any, userId: number): Promise<void> {
    if (!data || !userId || !file || !isFileValid(file) || !isBodyValid(data)) {
        throw new Error(POST_ERRORS.invalidPayload);
    }

    data.added_by = userId;

    const fileName = `${randomUUID()}.jpg`;
    const fileBuffer = (file as ImageFile).buffer;
    if (!fileName) {
        throw new Error(POST_ERRORS.invalidFile);
    }

    try {
        await processImage(fileBuffer, fileName);
        const publicUrl = getUrl(fileName);
        if (publicUrl) {
            data.img_url = publicUrl;
        }
    } catch (error) {
        if (error instanceof Error && error.message === POST_ERRORS.compressionAborted) {
            throw new Error(POST_ERRORS.imageNotSupport);
        } else {
            throw new Error(POST_ERRORS.imageNotProcessable);
        }
    }

    try {
        await addPost(data);
        return;
    } catch (error) {
        throw new Error(POST_ERRORS.uploadFailed);
    }
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