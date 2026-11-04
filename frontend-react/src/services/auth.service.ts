import { TOKEN_KEY } from "../components/context/Auth";
import { ApiCore, Util } from "../utils/api";
import BrowserStorage from "../utils/storage";

export function login(username: string, password: string) {
    if (username && password) {
        return ApiCore.post('/auth/login', { username, password })
            .then(Util.extractToken)

    }
    return Promise.reject(null);
}

export function signup(username: string, password: string) {
    if (username && password) {
        return ApiCore.post('/auth/signup', { username, password })
            .then(Util.extractToken)
    }
    return Promise.reject(null);
}

export function logout() {
    return ApiCore.get('/auth/logout');
}

export async function refreshToken() {
    return ApiCore.get('/auth/refresh-token')
        .then(Util.extractToken)
        .then(token => BrowserStorage.save(TOKEN_KEY, token));
}