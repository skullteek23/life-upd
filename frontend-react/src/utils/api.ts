import { TOKEN_KEY } from "../components/context/Auth.js";
import BrowserStorage from "./storage.js";

class ApiCore {
    static #authHeaderKey = 'token';
    static #domain = import.meta.env.VITE_API_BASE_URL;

    static get(url: string, options: any = {}): Promise<any> {
        const token = BrowserStorage.get(TOKEN_KEY);
        const opts = {
            method: 'GET',
            headers: {
                ...options.headers
            }
        }
        if (token != null) {
            opts.headers[this.#authHeaderKey] = token;
        }
        return fetch(this.#domain + url, opts)
            .then(ApiCore.handleError)
            .catch(ApiCore.catchError);
    }

    static post(url: string, body: any = {}, options: any = {}) {
        const token = BrowserStorage.get(TOKEN_KEY);
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

        return fetch(this.#domain + url, opts)
            .then(ApiCore.handleError)
            .catch(ApiCore.catchError);
    }

    static patch(url: string, body: any = {}, options: any = {}) {
        const token = BrowserStorage.get(TOKEN_KEY);
        const opts: any = {
            method: 'PATCH',
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

        return fetch(this.#domain + url, opts)
            .then(ApiCore.handleError)
            .catch(ApiCore.catchError);
    }

    static convertToJSON(response: Response | void) {
        return response ? response.json() : null;
    }

    static extractToken(value: any) {
        return value ? value['token'] : null;
    }

    static async handleError(res: Response) {
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Something went wrong');
        }

        return data;
    }

    static catchError(err: Error) {
        throw err;
    }
}

export default ApiCore;