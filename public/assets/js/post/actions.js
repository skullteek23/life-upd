import Create from './components/create.js';
import Validate from './components/validate.js';
import View from './components/view.js';

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