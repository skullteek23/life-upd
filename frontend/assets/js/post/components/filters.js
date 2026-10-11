import ApiService from "../../shared/api.js";
import PostAction from "../actions.js";

class PostFilters {
    async show() {
        this.queryPosts();
        this.addDateFilter();
    }

    addDateFilter() {
        const filter = document.getElementById('feed-filter-date');
        const resetBtn = document.createElement('button');
        const img = document.createElement('img');

        const resetFilter = () => filter.querySelectorAll('button').forEach(fl => fl.classList.remove('selected'))

        img.src = 'assets/images/home.svg';
        img.alt = 'Reset Range';
        resetBtn.classList.add('selectable-btn', 'cross-btn');
        resetBtn.appendChild(img);
        resetBtn.addEventListener('click', async () => {
            resetFilter();
            await this.queryPosts();
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
                await this.queryPosts(f);
            })
            filter.appendChild(btn);
        })
    }

    async queryPosts(filter) {
        const parseResult = (posts) => posts?.length ? posts : [];

        const params = new URLSearchParams();
        if (filter) {
            params.set(filter.urlParamKey, filter.value);
        }

        const result = parseResult(await new ApiService().get(`/posts?${params}`));
        new PostAction().do('view', result);
    }
}

const filters = [
    { value: 'last-w', label: 'This Week', urlParamKey: 'within' },
    { value: 'last-m', label: 'This Month', urlParamKey: 'within' },
    { value: 'last-6m', label: '6 Months', urlParamKey: 'within' },
    { value: 'last-y', label: 'This Year', urlParamKey: 'within' },
]

export default PostFilters;