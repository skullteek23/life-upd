import Auth from '../auth/auth.js';
import Posts from '../posts/post-service.js';

const ACTIONS = {
    add: '+ Add',
    login: 'Login',
    continue: 'Continue',
    publish: 'Post',
}

class Handler {
    #auth;

    constructor() {
        this.#auth = new Auth();
    }

    async handle() {
        if (this.#auth.isLoggedIn()) {
            this.#setBtnLabel(ACTIONS.add);
            this.addLogoutBtn();
        } else {
            this.#setBtnLabel(ACTIONS.login);
        }
        this.#setActionsListener();
    }

    #setBtnLabel(label) {
        const btn = document.getElementById('action-btn');
        btn.innerText = label;
    }

    #setActionsListener() {
        const btn = document.getElementById('action-btn');
        btn.addEventListener('click', this.#handleAction.bind(this, btn));
    }

    addLogoutBtn() {
        if (!document.getElementById('logout-btn')) {
            const header = document.querySelector('header');
            const btn = document.createElement('button');
            const image = document.createElement('img');
            image.src = 'assets/images/logout.svg';
            image.alt = 'Logout';
            btn.classList.add('primary-btn', 'logout-btn');
            btn.id = 'logout-btn';
            btn.appendChild(image);
            btn.addEventListener('click', () => {
                this.#auth.logout();
                this.#setBtnLabel(ACTIONS.login);
                new Posts().load();
                this.removeLogout();
            });
            header.appendChild(btn);
        }
    }

    removeLogout() {
        const btn = document.getElementById('logout-btn');
        if (btn) {
            btn.remove();
        }
    }

    async #handleAction(btn) {
        switch (btn.innerText) {
            case ACTIONS.add:
                new Posts().create();
                this.#setBtnLabel(ACTIONS.publish);
                break;
            case ACTIONS.publish:
                const result = await new Posts().publish();
                result ? this.#setBtnLabel(ACTIONS.add) : null;
                break;
            case ACTIONS.login:
                new Posts().clear();
                this.#auth.openLoginInput();
                this.#setBtnLabel(ACTIONS.continue);
                break;
            case ACTIONS.continue:
                const isAuthenticated = await this.#auth.continue();
                if (isAuthenticated) {
                    this.addLogoutBtn();
                    this.#setBtnLabel(ACTIONS.add);
                    new Posts().load();
                }
                break;

            default:
                console.log('no case matched!');
        }
    }
}

export default Handler;