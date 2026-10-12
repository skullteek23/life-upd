import Handler from './handler.js';
import Auth from '../auth/auth.js';

class App {
    async init() {
        this.auth = new Auth();
        this.handler = new Handler();
        this.handler.handle(this.auth);
    }
}

export default App;
