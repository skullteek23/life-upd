import ApiCore from "../utils/api";
import { Category, PostPayload, type Post as PostType } from '../models/post';

export function get(dateFilter: string, categoryFilter: string): Promise<PostType[]> {
    const params = new URLSearchParams();
    if (dateFilter) {
        params.set('within', dateFilter);
    }
    if (categoryFilter) {
        params.set('of', categoryFilter);
    }
    return ApiCore.get('/posts?' + params);
}

export function add(data: FormData): Promise<boolean> {
    return ApiCore.post('/posts', data, { hasImage: true, headers: {} })
        .then(response => response ? response.ok : false);
}

export function validate(formData: any) {
    const post = new PostPayload();
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