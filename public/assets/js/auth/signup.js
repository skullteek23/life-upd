import Card from '../shared/cards/card.js';

class Signup {

    show() {
        const list = document.getElementById('posts');
        const newListItem = document.createElement('li');

        newListItem.appendChild(new Card().get('signup'));
        list.replaceChildren();
        list.appendChild(newListItem);
    }

    getInput() {
        return { username: '@skullteek23', password: 12345 }
    }


}
export default Signup;