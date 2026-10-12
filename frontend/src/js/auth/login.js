import Card from "../components/cards/card-factory.js";
import { User } from "./auth.js";

class Login {
    show() {
        const list = document.getElementById('posts');
        const newListItem = document.createElement('li');

        newListItem.appendChild(new Card().get('login'));
        list.replaceChildren();
        list.appendChild(newListItem);
    }

    getInput() {
        const form = document.getElementById('auth-form');
        const values = Object.fromEntries(new FormData(form));
        const user = new User();
        if (values) {
            user.username = values?.username?.trim();
            user.password = values?.password?.trim();
        }
        return user;
    }


}
export default Login;