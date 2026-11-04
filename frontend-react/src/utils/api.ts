import AuthProvider, { TOKEN_KEY } from "../components/context/Auth.js";
import { refreshToken } from "../services/auth.service.js";
import BrowserStorage from "./storage.js";

const authHeaderKey = 'token';
const domain = import.meta.env.VITE_API_BASE_URL;
class ApiCore {

    static get(url: string, options: any = {}): Promise<any> {
        const token = BrowserStorage.get(TOKEN_KEY);
        const opts = {
            method: 'GET',
            credentials: ('include' as RequestCredentials | undefined),
            headers: {
                ...options.headers
            }
        }
        if (token != null) {
            opts.headers[authHeaderKey] = token;
        }
        return fetch(domain + url, opts)
            .then(Util.handleTokenExpiryError.bind(null, url, opts))
            .then(Util.handleUnauthorized)
            .then(Util.handleResourceNotFound)
            .then(Util.parseBody)
            .catch(Util.catchError);
    }

    static post(url: string, body: any = {}, options: any = {}): Promise<any> {
        const token = BrowserStorage.get(TOKEN_KEY);
        const opts: any = {
            method: 'POST',
            credentials: ('include' as RequestCredentials | undefined),
            headers: {}
        };

        if (token != null) {
            opts.headers[authHeaderKey] = token;
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

        return fetch(domain + url, opts)
            .then(Util.handleTokenExpiryError.bind(null, url, opts))
            .then(Util.handleUnauthorized)
            .then(Util.handleResourceNotFound)
            .then(Util.parseBody)
            .catch(Util.catchError);
    }

    static patch(url: string, body: any = {}, options: any = {}): Promise<any> {
        const token = BrowserStorage.get(TOKEN_KEY);
        const opts: any = {
            method: 'PATCH',
            credentials: ('include' as RequestCredentials | undefined),
            headers: {}
        };

        if (token != null) {
            opts.headers[authHeaderKey] = token;
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

        return fetch(domain + url, opts)
            .then(Util.handleTokenExpiryError.bind(null, url, opts))
            .then(Util.handleUnauthorized)
            .then(Util.handleResourceNotFound)
            .then(Util.parseBody)
            .catch(Util.catchError);
    }

}

class Util {

    static convertToJSON(response: Response | void) {
        return response ? response.json() : null;
    }

    static extractToken(value: any) {
        return value ? value['token'] : null;
    }

    static async handleTokenExpiryError(url: string, opts: any, res: Response) {
        if (res.status === 412) {
            console.log('Token expired, refreshing... ');
            await refreshToken();
            console.log('Token refreshed, retrying API... ');
            const token = BrowserStorage.get(TOKEN_KEY);
            return fetch(domain + url, { ...opts, headers: { [authHeaderKey]: token } })
        }
        return res;
    }

    static handleUnauthorized(res: Response | undefined) {
        if (res?.status === 401) {
            console.log('Session Expired! Please re-login... ');
            if (onUnauthorized) {
                onUnauthorized();
            }
        }
        return res;
    }

    static handleResourceNotFound(res: Response | undefined) {
        if (res?.status === 404) {
            throw new Error('Something went wrong');
        }
        return res;
    }

    static async parseBody(res: Response | undefined) {
        const data = await res?.json();

        if (!res?.ok) {
            throw new Error(data.error || 'Something went wrong');
        }

        return data;
    }

    static catchError(err: Error) {
        throw err;
    }

}

let onUnauthorized: (() => void) | null = null;
export function assignUnauthorizedCallback(callback: () => void) {
    onUnauthorized = callback;
}

export { ApiCore, Util };