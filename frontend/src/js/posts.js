import ApiService from './api.js';
import PostAction from './actions.js';
import PostFilters from './filters.js';

class Posts {
    async load() {
        await new PostFilters().show();
    }

    addPost() {
        new PostAction().do('create', null, {});
    }

    async publish() {
        const post = new PostAction().do('validate', null, {});
        const result = await new ApiService().post('/posts', post, { hasImage: true, headers: {} })
        if (!result.ok) {
            console.warn("Oops! Post didn't upload correctly");
            return false;
        } else {
            this.load();
            return true;
        }
    }
}

export const Category = {
    rsh: 'Relationship',
    mny: 'Money',
    hlt: 'Health',
    wrk: 'Work',
    slf: 'Self',
    lex: 'Life & Experiences'
}

export default Posts;