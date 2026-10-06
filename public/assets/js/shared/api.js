import BrowserStorage from "./storage.js";

class ApiService {
    #authHeaderKey = 'token';

    get(url, options = {}) {
        const token = BrowserStorage.get('token');
        const opts = {
            method: 'GET',
            headers: {
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
            headers: {}
        };

        if (token != null) {
            opts.headers[this.#authHeaderKey] = token;
        }

        if (options.sendImage === true) {
            opts.body = body;
        } else if (Object.keys(body).length > 0) {
            opts.body = JSON.stringify(body);
            opts.headers = {
                'Content-Type': 'application/json',
                ...options.headers,
            }
        }

        return fetch(url, opts)
    }
}

export default ApiService;