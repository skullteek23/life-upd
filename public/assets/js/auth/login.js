import Card from "../shared/cards/card.js";

class Login {

    show() {
        const list = document.getElementById('posts');
        const newListItem = document.createElement('li');

        newListItem.appendChild(new Card().get('login'));
        list.replaceChildren();
        list.appendChild(newListItem);
    }

    getInput() {
        return { username: '@skullteek23', password: 12345 }
    }


}
export default Login;