import Create from './create.js';
import Validate from './validate.js';
import View from './view.js';

class PostAction {

    do(action, data, dependency) {
        switch (action) {
            case 'view':
                if (data) {
                    new View().init(data);
                }
                break;

            case 'create':
                // Can only create when user is logged in
                new Create().init();
                break;
            case 'validate':
                // Can only create when user is logged in
                return new Validate().init();
            default:
                console.log('no case matched!');
        }
    }
}

export default PostAction;