import AuthInput from "./input.js";
import ApiService from "../data/api-service.js";
import BrowserStorage from "../data/browser-storage.js";

class AuthServer {
    async login() {
        const { username, password } = AuthInput.getInput();
        const result = await (new ApiService().post('/auth/login', { username, password }).then(response => response.json()))
        if (result['token']) {
            BrowserStorage.save('token', result['token']);
            return true;
        }
        BrowserStorage.clear();
        return false;
    }

    async signup() {
        const { username, password } = AuthInput.getInput();
        const result = await (new ApiService().post('/auth/signup', { username, password }).then(response => response.json()))
        if (result['token']) {
            BrowserStorage.save('token', result['token']);
            return true;
        }
        BrowserStorage.clear();
        return false;
    }
}

export default AuthServer;