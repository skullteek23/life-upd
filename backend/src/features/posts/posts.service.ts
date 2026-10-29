import { randomUUID } from 'crypto';
import { addPost, queryPosts, updatePost } from "./posts.repository";
import { Category, IPost, ImageFile, PostFilters } from "./posts.type";
import { processImage } from '@utils/img-processing';
import { POST_ERRORS } from '@utils/constants';
import { getUrl } from '@utils/storage';

export const MAX_INPUT_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
export const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heif', 'image/heic'];

export async function getPosts(queryParams: any): Promise<IPost[]> {
    const postFilter: PostFilters = queryParams;
    postFilter.within = queryParams['within'];
    postFilter.of = queryParams['of'];
    postFilter.includePvt = queryParams['userId'] ? { ofUser: queryParams['userId'] } : null;
    if (queryParams['postId']) {
        postFilter.id = Number(queryParams['postId']);
    }
    return sortPosts(await queryPosts(postFilter));
}

export async function uploadNewPost(data: Partial<IPost>, file: any, userId: number): Promise<void> {

    if (!data || !userId || !file || !isFileValid(file) || !isValidPost(data, 'all')) {
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

export async function updateExistingPost(data: Partial<IPost>, file: any, userId: number, postId: number): Promise<void> {
    if (!userId || (!file && !data) || (!isFileValid(file) && !isValidPost(data, 'partial'))) {
        throw new Error(POST_ERRORS.invalidPayload);
    }

    if (file) {
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
    }

    try {
        await updatePost(postId, data);
        return;
    } catch (err: any) {
        console.log(err.message);
        throw new Error(POST_ERRORS.uploadFailed);
    }
}

function sortPosts(data: IPost[]): IPost[] {
    return data.sort((a, b) => (new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
}

export function isFileValid(file: ImageFile): boolean {
    if (file && file.buffer && file.size <= MAX_INPUT_FILE_SIZE && allowedTypes.includes(file.mimetype)) {
        return true;
    }
    return false;
}

type ValidationMode = 'all' | 'partial';

function isValidPost(
    data: Partial<IPost>,
    mode: ValidationMode = 'all'
): boolean {
    const validators: Record<keyof Pick<IPost, 'caption' | 'category' | 'is_pvt'>, (value: unknown) => boolean> = {
        caption: (value) =>
            typeof value === 'string' && value.trim().length > 0,

        category: (value) =>
            typeof value === 'string' &&
            Object.keys(Category).includes(value) &&
            value.length === 3,

        is_pvt: (value) =>
            Number(value) === 0 || Number(value) === 1,
    };

    return (Object.keys(validators) as Array<keyof typeof validators>).every((key) => {
        const exists = Object.hasOwn(data, key);

        // All mode: every key must exist
        if (mode === 'all' && !exists) return false;

        // Partial mode: skip keys that don't exist
        if (mode === 'partial' && !exists) return true;

        return validators[key](data[key]);
    });
}