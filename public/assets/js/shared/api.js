class ApiService {
    #authHeaderKey = 'x-user-id';

    get(url, options = {}) {
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                [this.#authHeaderKey]: options.userId,
                ...options.headers
            }
        }).then(response => response.json())
    }

    post(url, body = {}, options = {}) {
        const opts = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        };

        if (options.userId !== undefined) {
            opts.headers[this.#authHeaderKey] = options.userId;
        }

        if (Object.keys(body).length > 0) {
            opts.body = JSON.stringify(body);
        }

        return fetch(url, opts)
            .then(response => response.ok);
    }
}

export default ApiService;