import BrowserStorage from "./browser-storage.js";
import { API_BASE_URL } from "../../../config.js";

export const DOMAIN_URL = API_BASE_URL;

class ApiService {
    #authHeaderKey = 'token';
    #domain = DOMAIN_URL;

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
        return fetch(this.#domain + url, opts).then(response => response.json()).catch(err => console.log(err.message))
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

export default ApiService;