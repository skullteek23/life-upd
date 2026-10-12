import CreatePostCard from "./create-post-card.js";
import LoginCard from "./login-card.js";
import ShowPostCard from "./show-post-card.js";
import SignupCard from "./signup-card.js";

export class Card {
    get(type, cardData) {
        switch (type) {
            case 'show-post':
                return ShowPostCard.get(cardData);
            case 'create-post':
                return CreatePostCard.get();
            case 'login':
                return LoginCard.get();
            case 'signup':
                return SignupCard.get();

            default:
                console.log('no case matched!');

        }
    }
}

export default Card;