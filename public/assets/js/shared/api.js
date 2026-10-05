import BrowserStorage from "./storage.js";

class ApiService {
    #authHeaderKey = 'token';

    get(url, options = {}) {
        const token = BrowserStorage.get('token');
        const opts = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        }
        if (token != null) {
            opts.headers[this.#authHeaderKey] = token;
        }
        return fetch(url, opts).then(response => response.json())
    }

    post(url, body = {}, options = {}) {
        const token = BrowserStorage.get('token');
        const opts = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        };

        if (token != null) {
            opts.headers[this.#authHeaderKey] = token;
        }

        if (Object.keys(body).length > 0) {
            opts.body = JSON.stringify(body);
        }

        return fetch(url, opts)
            .then(response => response.json());
    }
}

export default ApiService;