import Card from "../../shared/cards/card.js";

class View {
    async init(data) {
        this.#createPostList(data);
    }

    async #createPostList(value) {
        const list = document.getElementById('posts');
        list.replaceChildren();
        for (const item of value) {
            list.appendChild(await this.#createPostListItem(item));
        }
    }

    async #createPostListItem(item) {
        const newListItem = document.createElement('li');
        newListItem.appendChild(new Card().get('show-post', item));
        return newListItem;
    }
}

export default View;