import ApiService from "../shared/api.js";
import Login from "./login.js";
import Signup from "./signup.js";

class Auth {
    #authToken = 0;
    #auth = {
        isLoggedIn: false,
        username: '',
        userID: null
    }

    constructor() {
        this.#setAuth();
    }

    #getAuth() {
        return this.#auth;
    }

    #setAuth() {
        if (Number(this.#authToken) === 1) {
            this.#auth.isLoggedIn = true;
            this.#auth.username = '@skullteek23';
            this.#auth.userID = 2;
        } else {
            this.#auth.isLoggedIn = false;
            this.#auth.username = '';
            this.#auth.userID = null;
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

    async login() {
        const { username, password } = new Login().getInput();
        const result = await new ApiService().post('/auth/login', { username, password })
        if (result) {
            this.#authToken = 1;
            this.#setAuth();
            return true;
        }
        return false;
    }

    async signup() {
        const { username, password } = new Signup().getInput();
        const result = await new ApiService().post('/auth/signup', { username, password })
        if (result) {
            this.#authToken = 1;
            this.#setAuth();
            return true;
        }
        return false;
    }

    #isUserLoggedIn() {
        return this.#getAuth().isLoggedIn === true;
    }

    getUserID() {
        if (this.#isUserLoggedIn()) {
            return this.#auth.userID;
        } return null;
    }

    getUsername() {
        if (this.#isUserLoggedIn()) {
            return this.#auth.username;
        } return null;
    }
}

export default Auth;