import Util from "../utility.js";

class ShowPostCard {
    static #assetsEndpoint = '/assets/images/';

    static get(item) {
        const template = document.getElementById('post-template');
        const newCard = template.content.cloneNode(true);

        newCard.querySelector('.username').innerText = '@skullteek23';
        newCard.querySelector('.date-posted').innerText = Util.formatDate(item['created_at']);
        newCard.querySelector('.card-image').src = item['img_url'];
        newCard.querySelector('.card-content').innerText = item['caption'];

        if (item['is_pvt'] === 1) {
            const visibilityImage = document.createElement('img');
            this.#setVisibility(item['is_pvt'], visibilityImage);
            newCard.querySelector('.visibility-icon').appendChild(visibilityImage);
        }

        const categoryImage = document.createElement('img');
        this.#setCategory(item['category'], categoryImage)
        newCard.querySelector('.category-icon').appendChild(categoryImage);

        return newCard;
    }

    static #setVisibility(value, element) {
        if (Number(value) === 1) {
            element.src = this.#assetsEndpoint + 'private.svg';
            element.alt = 'Privately visible';
        } else {
            element.src = this.#assetsEndpoint + 'public.svg';
            element.alt = 'Visible to everyone';
        }
    }

    static #setCategory(value, element) {
        element.src = this.#assetsEndpoint;
        switch (value) {
            case 'rsh':
                element.src += 'rsh.svg';
                element.alt = 'Relationship';
                break;
            case 'mny':
                element.src += 'mny.svg';
                element.alt = 'Money';
                break;
            case 'hlt':
                element.src += 'hlt.svg';
                element.alt = 'Health';
                break;
            case 'wrk':
                element.src += 'wrk.svg';
                element.alt = 'Work';
                break;
            case 'slf':
                element.src += 'slf.svg';
                element.alt = 'Self';
                break;
            case 'lex':
                element.src += 'lex.svg';
                element.alt = 'Life & Experiences';
                break;

            default:
                console.log('no case matched!');
        }
    }
}

export default ShowPostCard;