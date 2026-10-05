import { addPost, postsForEveryone, postsForUser } from "./posts.repository";
import { Category, IPost } from "./posts.type";

export async function getPosts(userId: number): Promise<IPost[]> {
    let posts: IPost[] = [];
    if (userId) {
        posts = await postsForUser(userId);
    } else {
        posts = await postsForEveryone();
    }
    return sortPosts(posts);
}

export async function uploadPost(data: Partial<IPost>, userId: number): Promise<boolean> {
    if (!data || !userId) {
        return false;
    }

    data.added_by = userId;
    data.img_url = 'https://picsum.photos/200';

    if (!isValid(data)) {
        return false;
    }

    try {
        await addPost(data);
        return true;
    } catch (error) {
        return false;
    }
}

function sortPosts(data: IPost[]): IPost[] {
    return data.sort((a, b) => (new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
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