import Card from "../components/cards/card-factory";
import { User } from "./auth";

class AuthInput {
    constructor(inputType) {
        const list = document.getElementById('posts');
        const newListItem = document.createElement('li');

        newListItem.appendChild(new Card().get(inputType));
        list.replaceChildren();
        list.appendChild(newListItem);
    }

    static getInput() {
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

export default AuthInput;