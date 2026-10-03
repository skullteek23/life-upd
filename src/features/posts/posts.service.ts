import { addPost, findAllPosts, findPostsByUserId } from "./posts.repository";
import { Category, IPost } from "./posts.type";

export function getAllPosts(): Promise<IPost[]> {
    return findAllPosts()
        .then(sortPosts);
}

export function getPostsByUser(userId: number): Promise<IPost[]> {
    return findPostsByUserId(userId)
        .then(sortPosts);
}

export async function uploadPost(data: Partial<IPost>, userId: number): Promise<boolean> {
    data.added_by = userId;
    data.img_url = 'https://dummyimage.com/600x400/000/fff';
    if (isValid(data) && userId) {
        await addPost(data);
        return true;
    }
    return false;
}

function sortPosts(data: IPost[]): IPost[] {
    return data.sort((a, b) => b.created_at - a.created_at);
}

function isValid(data: Partial<IPost>): boolean {
    const isCaptionValid = data.caption?.trim()?.length;
    const isCategoryValid = data.category && Object.keys(Category).includes(data.category);
    const isVisibilityValid = Number(data.is_pvt) === 0 || Number(data.is_pvt) === 1;
    const isAddedByValid = Number(data.added_by) > 0;
    const isValidImgUrl = data.img_url !== undefined || data.img_url !== null || data.img_url !== '';
    if (isCaptionValid && isCategoryValid && isVisibilityValid && isAddedByValid && isValidImgUrl) {
        return true;
    } else return false;
}