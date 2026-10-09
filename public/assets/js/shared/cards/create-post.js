import { Category } from "../models.js";

class CreatePostCard {
    static get() {
        const template = document.getElementById('input-template');
        const createCard = template.content.cloneNode(true);

        this.#setCategoryInput(createCard);
        this.#setImageInput(createCard);
        this.#setVisibilityInput(createCard);

        return createCard;
    }

    static #setCategoryInput(form) {
        const container = form.querySelector('.card-title-action');
        container.replaceChildren();

        const actionTemplate = document.getElementById(
            'card-title-action-template'
        );

        const input = form.querySelector('#category');

        for (const [key, value] of Object.entries(Category)) {
            const action = this.#createAction(
                actionTemplate,
                key,
                value,
                `/assets/images/${key}.svg`
            );

            action.addEventListener('click', () => {
                input.value = action.dataset.value;

                container
                    .querySelectorAll('.action-element')
                    .forEach(element => element.classList.remove('selected'));

                action.classList.add('selected');
            });

            container.appendChild(action);
        }
    }

    static #setImageInput(form) {
        const image = form.querySelector('.card-image-input');
        const removeBtn = form.querySelector('.remove-image-btn');
        removeBtn.disabled = true;
        const fileInput = form.querySelector('#photo');

        let imageUrl = null;

        fileInput.addEventListener('change', (e) => {
            const file = e.currentTarget.files[0];

            if (!file) return;

            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }

            imageUrl = URL.createObjectURL(file);
            image.src = imageUrl;
            removeBtn.disabled = false;
        });

        removeBtn.addEventListener('click', (e) => {
            if (image.src !== '/assets/images/placeholder.png') {
                image.src = '/assets/images/placeholder.png';
                e.currentTarget.disabled = true;
            }
        })

        image.addEventListener('click', () => {
            fileInput.click();
        });
    }

    static #setVisibilityInput(form) {
        const select = form.querySelector('.visibility-selection');

        const option = document.createElement('option');
        option.innerText = 'Only me';
        option.value = '1';
        option.selected = true;

        const option2 = document.createElement('option');
        option2.innerText = 'Everyone';
        option2.value = '0';

        select.append(option, option2);
    }

    static #createAction(template, value, label, imageSrc) {
        const fragment = template.content.cloneNode(true);
        const action = fragment.querySelector('.action-element');

        action.dataset.value = value;

        action.querySelector('.action-element-img').src = imageSrc;
        action.querySelector('.action-element-text').innerText = label;

        return action;
    }
}

export default CreatePostCard;