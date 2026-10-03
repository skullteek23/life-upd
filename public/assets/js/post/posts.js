import ApiService from '../shared/api.js';
import PostAction from './actions.js';

class Posts {
    async load(auth) {
        const parseResult = (result) => {
            return result?.length ? result : [];
        }

        const userId = auth.getUserID();
        const url = '/posts' + (!!userId ? '?pvt=1' : '');
        let results = await new ApiService().get(url, userId ? { userId } : {});
        results = parseResult(results);

        new PostAction().do('view', results);
    }

    addPost(auth) {
        new PostAction().do('create', null, { auth });
    }

    async publish(auth) {
        const post = new PostAction().do('validate', null, { auth });
        const userId = auth.getUserID();
        if (!userId) {
            return;
        }
        const result = await new ApiService().post('/posts', post, { userId })
        if (!result) {
            console.warn("Oops! Post didn't upload correctly");
        }
        this.load(auth);
    }
}

export default Posts;