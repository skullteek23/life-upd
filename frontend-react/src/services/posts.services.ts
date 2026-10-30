import ApiCore from "../utils/api";
import { Category, NewPostPayload, type Post as PostType, type PostUpdatePayload } from '../models/post';

export function getPosts(dateFilter: string, categoryFilter: string): Promise<PostType[]> {
    const params = new URLSearchParams();
    if (dateFilter) {
        params.set('within', dateFilter);
    }
    if (categoryFilter) {
        params.set('of', categoryFilter);
    }
    return ApiCore.get('/posts?' + params);
}

export async function getPost(postID: number): Promise<PostType | null> {
    return ApiCore.get(`/posts/${postID}`);
}

export function add(data: FormData): Promise<Response> {
    return ApiCore.post('/posts', data, { hasImage: true, headers: {} })
}

export function update(data: FormData, postID: number): Promise<Response> {
    return ApiCore.patch(`/posts/${postID}`, data, { hasImage: true, headers: {} })
}

export function validateNewPost(formData: any) {
    const post = new NewPostPayload();
    post.caption = formData.caption.trim();
    post.is_pvt = Number(formData.visibility);
    post.photo = formData.photo;
    if (Object.keys(Category).includes(formData.category)) {
        post.category = formData.category;
    }
    const data = new FormData();
    data.append('caption', post.caption);
    data.append('is_pvt', post.is_pvt as any);
    data.append('category', post.category);
    data.append('photo', post.photo as any);
    return data;
}

export function validateExistingPost(formData: any) {
    const post: PostUpdatePayload = {};
    post.caption = formData.caption.trim();
    post.is_pvt = Number(formData.visibility);
    post.photo = formData.photo;
    if (Object.keys(Category).includes(formData.category)) {
        post.category = formData.category;
    }
    const data = new FormData();
    if (post.caption) {
        data.append('caption', post.caption);
    }
    if ([0, 1].includes(Number(post.is_pvt))) {
        data.append('is_pvt', post.is_pvt as any);
    }
    if (post.category) {
        data.append('category', post.category);
    }
    if (post.photo) {
        data.append('photo', post.photo as any);
    }
    return data;
}