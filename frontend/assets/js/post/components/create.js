import Card from "../../shared/cards/card.js";

class Create {
    async init() {
        const posts = document.getElementById('posts');
        const listItem = document.createElement('li');
        listItem.appendChild(new Card().get('create-post'))
        posts.replaceChildren(listItem);
    }
}

export default Create;