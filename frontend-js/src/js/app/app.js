import Posts from '../posts/post-service.js';
import Handler from './handler.js';

class App {
    async init() {
        new Handler().handle();
        new Posts().load();
    }
}

export default App;
