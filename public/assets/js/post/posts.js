import ApiService from '../shared/api.js';
import PostAction from './actions.js';

class Posts {
    async load() {
        const parseResult = (posts, users) => {
            posts.forEach(post => {
                post.added_by = users.find(user => user.id === post.added_by)?.username || 'DELETED_USER';
            });
            return posts?.length ? posts : [];
        }

        let posts = await new ApiService().get('/posts');
        let users = await new ApiService().get('/users');
        posts = parseResult(posts, users);

        new PostAction().do('view', posts);
    }

    addPost() {
        new PostAction().do('create', null, {});
    }

    async publish() {
        const post = new PostAction().do('validate', null, {});
        const result = await new ApiService().post('/posts', post)
        if (!result) {
            console.warn("Oops! Post didn't upload correctly");
        }
        this.load();
    }
}

export default Posts;