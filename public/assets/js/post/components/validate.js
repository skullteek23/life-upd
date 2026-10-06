import { PostData, Category } from "../../shared/models.js";

class Validate {
    #post;

    init() {
        const form = document.getElementById('input-form');
        const values = Object.fromEntries(new FormData(form));
        this.#post = new PostData();
        if (values) {
            this.#validateInput(values);

            const data = new FormData();
            data.append('caption', this.#post.caption);
            data.append('is_pvt', this.#post.is_pvt);
            data.append('category', this.#post.category);
            data.append('photo', this.#post.photo);
            return data;
        }

    }

    #validateInput(formData) {
        this.#post.caption = formData.caption.trim();
        this.#post.is_pvt = Number(formData.visibility);
        this.#post.photo = formData.photo;
        if (Object.keys(Category).includes(formData.category)) {
            this.#post.category = formData.category;
        }
    }
}

export default Validate;