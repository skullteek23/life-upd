import BrowserStorage from "./storage.js";

class ApiCore {
    static #authHeaderKey = 'token';
    static #domain = import.meta.env.VITE_API_BASE_URL;

    static get(url: string, options: any = {}): Promise<any> {
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
        return fetch(this.#domain + url, opts).then(response => response.json()).catch(err => console.log(err.message))
    }

    static post(url: string, body: any = {}, options: any = {}) {
        const token = BrowserStorage.get('token');
        const opts: any = {
            method: 'POST',
            headers: {}
        };

        if (token != null) {
            opts.headers[this.#authHeaderKey] = token;
        }

        if (options.hasImage === true) {
            opts.body = body;
        } else if (Object.keys(body).length > 0) {
            opts.body = JSON.stringify(body);
            opts.headers = {
                'Content-Type': 'application/json',
                ...options.headers,
            }
        }

        return fetch(this.#domain + url, opts).catch(err => console.log(err.message))
    }
}

export default ApiCore;