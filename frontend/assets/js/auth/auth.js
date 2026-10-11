import ApiService from "../shared/api.js";
import Login from "./login.js";
import Signup from "./signup.js";
import BrowserStorage from "../shared/storage.js";

class Auth {
    #authToken = null;

    constructor() {
        this.#setAuth();
    }

    async #setAuth() {
        const token = BrowserStorage.get('token');
        if (token) {
            this.#authToken = token;
        }
    }

    async continue() {
        const form = document.getElementById('auth-form');
        switch (form.dataset.authType) {
            case 'login':
                return await this.login();
            case 'signup':
                return await this.signup();
            default:
                console.log('no case matched!');
                break;
        }
    }

    openLoginInput() {
        new Login().show();
        this.addAnchorListener('signup');
    }

    addAnchorListener(action) {
        const anchor = document.getElementById('auth-action');
        anchor.addEventListener('click', () => {
            if (action === 'login') {
                this.openLoginInput();
            } else if (action === 'signup') {
                this.openSignupInput();
            }
        })
    }

    openSignupInput() {
        new Signup().show();
        this.addAnchorListener('login');
    }

    isLoggedIn() {
        return this.#authToken != null;
    }

    logout() {
        BrowserStorage.clear();
    }

    async login() {
        const { username, password } = new Login().getInput();
        const result = await (new ApiService().post('/auth/login', { username, password }).then(response => response.json()))
        if (result['token']) {
            BrowserStorage.save('token', result['token']);
            this.#setAuth();
            return true;
        }
        BrowserStorage.clear();
        return false;
    }

    async signup() {
        const { username, password } = new Signup().getInput();
        const result = await (new ApiService().post('/auth/signup', { username, password }).then(response => response.json()))
        if (result['token']) {
            BrowserStorage.save('token', result['token']);
            this.#setAuth();
            return true;
        }
        BrowserStorage.clear();
        return false;
    }
}

export default Auth;