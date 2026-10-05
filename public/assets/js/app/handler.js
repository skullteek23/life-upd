import Posts from '../post/posts.js';

const LABELS = {
    add: '+ Add',
    login: 'Login',
    continue: 'Continue',
    publish: 'Post',
}

class Handler {
    #auth;
    #posts;

    async handle(auth) {
        this.#auth = auth;
        this.#posts = new Posts();
        this.#posts.load();

        if (this.#auth.isLoggedIn()) {
            this.#setBtnLabel(LABELS.add);
            this.addLogoutBtn();
        } else {
            this.#setBtnLabel(LABELS.login);
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
                this.#setBtnLabel(LABELS.login);
                this.#posts.load();
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
            case LABELS.add:
                this.#posts.addPost();
                this.#setBtnLabel(LABELS.publish);
                break;
            case LABELS.publish:
                await this.#posts.publish();
                this.#setBtnLabel(LABELS.add);
                break;
            case LABELS.login:
                this.#auth.openLoginInput();
                this.#setBtnLabel(LABELS.continue);
                break;
            case LABELS.continue:
                const isAuthenticated = await this.#auth.continue();
                if (isAuthenticated) {
                    this.addLogoutBtn();
                    this.#setBtnLabel(LABELS.add);
                    this.#posts.load();
                }
                break;

            default:
                console.log('no case matched!');
        }
    }
}

export default Handler;