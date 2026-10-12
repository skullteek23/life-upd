import ApiService from '../data/api-service.js';
import Create from './post-create.js';
import Validate from './post-validator.js';
import View from "./post-view.js";

export const Category = {
    rsh: 'Relationship',
    mny: 'Money',
    hlt: 'Health',
    wrk: 'Work',
    slf: 'Self',
    lex: 'Life & Experiences'
}

export class Post {
    added_by = undefined;
    photo = null;
    caption = '';
    category = null;
    is_pvt = null;
}

class Posts {
    load() {
        new Filters().show();
        new Data().get();
    }

    create() {
        new Filters().clear();
        new Create().init();
    }

    async publish() {
        const post = new Validate().init();
        const result = await new Data().set(post);
        if (result) {
            this.load();
            return true;
        }
    }

    clear() {
        new Filters().clear();
    }
}

class Filters {
    show() {
        const container = this.clear();
        this.showDateFilter(container);
    }

    showDateFilter(container) {
        const filter = document.createElement('div');
        filter.classList.add('date-filter')

        const resetBtn = document.createElement('button');
        const img = document.createElement('img');

        const resetFilter = () => filter.querySelectorAll('button').forEach(fl => fl.classList.remove('selected'))

        img.src = 'assets/images/home.svg';
        img.alt = 'Reset Range';
        resetBtn.classList.add('selectable-btn', 'cross-btn');
        resetBtn.appendChild(img);
        resetBtn.addEventListener('click', async () => {
            resetFilter();
            await new Data().get();
        });
        filter.appendChild(resetBtn);

        filters.forEach(f => {
            const btn = document.createElement('button');
            btn.innerHTML = f.label;
            btn.type = "button";
            btn.classList.add('selectable-btn');
            btn.addEventListener('click', async (e) => {
                resetFilter();
                e.currentTarget.classList.add('selected');
                await new Data().get(f);
            })
            filter.appendChild(btn);
        });

        container.appendChild(filter);
    }

    clear() {
        const filters = document.getElementById('filter');
        filters.replaceChildren();
        return filters;
    }

}

class Data {
    async get(filter) {
        const parseResult = (posts) => posts?.length ? posts : [];

        const params = new URLSearchParams();
        if (filter) {
            params.set(filter.urlParamKey, filter.value);
        }

        const result = parseResult(await new ApiService().get(`/posts?${params}`));
        new View().init(result);
    }

    async set(data) {
        const result = await new ApiService().post('/posts', data, { hasImage: true, headers: {} })
        if (!result || !result.ok) {
            console.warn("Oops! Post didn't upload correctly");
            return false;
        }
        return true;
    }
}

const filters = [
    { value: 'last-w', label: 'This Week', urlParamKey: 'within' },
    { value: 'last-m', label: 'This Month', urlParamKey: 'within' },
    { value: 'last-6m', label: '6 Months', urlParamKey: 'within' },
    { value: 'last-y', label: 'This Year', urlParamKey: 'within' },
]

export default Posts;