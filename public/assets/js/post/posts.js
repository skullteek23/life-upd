import ApiService from '../shared/api.js';
import PostAction from './actions.js';

class Posts {
    async load() {
        const parseResult = (posts) => {
            return posts?.length ? posts : [];
        }

        let posts = await new ApiService().get('/posts');
        posts = parseResult(posts);

        new PostAction().do('view', posts);
    }

    addPost() {
        new PostAction().do('create', null, {});
    }

    async publish() {
        const post = new PostAction().do('validate', null, {});
        const result = await new ApiService().post('/posts', post, { sendImage: true, headers: {} })
        if (!result.ok) {
            console.warn("Oops! Post didn't upload correctly");
        }
        this.load();
    }
}

export default Posts;