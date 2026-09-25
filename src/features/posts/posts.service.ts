import { addPost, findAllPosts, findPostsByUserId } from "./posts.repository";
import { Category, IPost } from "./posts.type";

export function getAllPosts(): Promise<IPost[]> {
    return findAllPosts();
}

export function getPostsByUser(userId: number): Promise<IPost[]> {
    return findPostsByUserId(userId);
}

export async function uploadPost(data: Partial<IPost>, userId: number): Promise<boolean> {
    if (isValid(data) && userId) {
        data.added_by = userId;
        await addPost(data);
        return true;
    }
    return false;
}

function isValid(data: Partial<IPost>): boolean {
    const categoryList = Object.keys(Category);
    if (!data?.caption?.trim() || !categoryList.includes(data.category || '') || !data.img_url) {
        return false;
    } else {
        return true;
    }
}