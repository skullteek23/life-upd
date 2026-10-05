import { PostData, Category } from "../../shared/models.js";

class Validate {
    #post;

    init() {
        const form = document.getElementById('input-form');
        const values = Object.fromEntries(new FormData(form));
        this.#post = new PostData();
        if (values) {
            this.#validateInput(values);
        }
        return this.#post;
    }

    #validateInput(formData) {
        this.#post.caption = formData.caption.trim();
        this.#post.is_pvt = Number(formData.visibility);
        if (Object.keys(Category).includes(formData.category)) {
            this.#post.category = formData.category;
        }
    }
}

export default Validate;