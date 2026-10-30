import { USER_KEY } from "../components/context/Auth";
import type { User } from "../models/user";
import ApiCore from "../utils/api";
import BrowserStorage from "../utils/storage";

export async function getUser(): Promise<User | null> {
    const user: User = BrowserStorage.get(USER_KEY);
    if (user && user.id && user.username) {
        return user;
    } else {
        const user: User = await get();
        BrowserStorage.save(USER_KEY, user);
        return user;
    }
}

function get(): Promise<User> {
    return ApiCore.get('/users/describe-user')
        .catch(err => { console.log(err.message); return null; });
}