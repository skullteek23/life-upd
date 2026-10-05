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