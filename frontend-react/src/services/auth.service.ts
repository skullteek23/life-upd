import ApiCore from "../utils/api";

export function login(username: string, password: string) {
    if (username && password) {
        return ApiCore.post('/auth/login', { username, password })
            .then(ApiCore.convertToJSON)
            .then(ApiCore.extractToken)

    }
    return Promise.reject(null);
}

export function signup(username: string, password: string) {
    if (username && password) {
        return ApiCore.post('/auth/signup', { username, password })
            .then(ApiCore.convertToJSON)
    }
    return Promise.reject(null);
}