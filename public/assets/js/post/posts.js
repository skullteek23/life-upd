import ApiService from '../shared/api.js';
import PostAction from './actions.js';

class Posts {
    async load() {
        const parseResult = (result) => {
            return result?.length ? result : [];
        }

        const url = '/posts';
        let results = await new ApiService().get(url);
        results = parseResult(results);

        new PostAction().do('view', results);
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