import Card from "../components/cards/card-factory.js";

class Create {
    async init() {
        const posts = document.getElementById('posts');
        const listItem = document.createElement('li');
        listItem.appendChild(new Card().get('create-post'))
        posts.replaceChildren(listItem);
    }
}

export default Create;