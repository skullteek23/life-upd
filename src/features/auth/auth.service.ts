import { getToken } from "../../utils/jwt-token";
import { compare, toHash } from "../../utils/password";
import { IStatus } from "../../utils/types";
import { IUser } from "../users/users.type";
import { addUser, findUserByUsername } from "./auth.repository";
import { ILoginData } from "./auth.type";

export async function signupWithUsername(username: string, password: string): Promise<string> {
    const password_hash = await toHash(password);
    const user = await addUser({ username, password_hash });
    const userID = user.rows[0].id;
    return getToken(userID);
}

export async function loginWithUsername(loginData: ILoginData): Promise<IStatus> {
    const { username, password } = loginData;
    const status: IStatus = {
        error: '',
        response: null
    };

    if (!isUsernameValid(username) || !isPasswordValid(password)) {
        status.error = 'Username/password invalid';
        return status;
    }


    const result = await findUserByUsername(username);
    if (result.rowCount !== 1) {
        status.error = 'Invalid user found!';
        return status;
    } else {
        const user: IUser = result.rows[0];
        const passwordHash = user.password_hash;
        const token = getToken(user.id);
        if (await compare(password, passwordHash)) {
            // Password matches
            // User is valid
            status.error = '';
            status.response = { token };
            return status;
        }
    }

    return status;
}

export function isUsernameValid(value: string): boolean {
    // Valid username - min 1 letter, max 15 letters, contains only a-z, A-Z, 0-9, ., _
    const parsedValue = getParsedValue(value);
    const regex = getUsernameRegex();
    return parsedValue?.length >= 1 && parsedValue.length <= 15 && regex.test(parsedValue);
}

export function isPasswordValid(value: string): boolean {
    // Valid password - 4-20 character length
    const parsedValue = getParsedValue(value);
    return parsedValue?.length >= 4 && parsedValue.length <= 20;
}

export async function isUsernameDuplicate(value: string): Promise<boolean> {
    const result = await findUserByUsername(value);
    return result.rowCount !== null && result.rowCount === 0;
}

function getParsedValue(value: string): string {
    return typeof value === 'string' && value !== null && value !== undefined && value.trim() ? value : '';
}

function getUsernameRegex() {
    return new RegExp('^[a-zA-Z0-9._]+$');
}

function hash(value: string) {
    return;
}
