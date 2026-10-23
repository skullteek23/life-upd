import BrowserStorage from "../data/browser-storage.js";
import AuthServer from "./action.js";
import AuthInput from "./input.js";

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
                const loginResult = await new AuthServer().login();
                if (loginResult) {
                    this.#setAuth();
                }
                return loginResult;
            case 'signup':
                const signupResult = await new AuthServer().signup();
                if (signupResult) {
                    this.#setAuth();
                }
                return signupResult;
            default:
                console.log('no case matched!');
                break;
        }
    }

    openLoginInput() {
        new AuthInput('login');
        this.addAnchorListener('login');
    }

    addAnchorListener(currentScreen) {
        const anchor = document.getElementById('auth-action');
        anchor.addEventListener('click', () => {
            if (currentScreen === 'signup') {
                this.openLoginInput();
            } else if (currentScreen === 'login') {
                this.openSignupInput();
            }
        })
    }

    openSignupInput() {
        new AuthInput('signup');
        this.addAnchorListener('signup');
    }

    isLoggedIn() {
        return this.#authToken != null;
    }

    logout() {
        BrowserStorage.clear();
    }
}

export class User {
    username = '';
    password = '';
}

export default Auth;