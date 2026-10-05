import { getToken } from "../../utils/jwt-token";
import { compare, toHash } from "../../utils/password";
import { IStatus } from "../../utils/types";
import { addUser, findUserByUsername } from "../users/users.repository";
import { IUser } from "../users/users.type";
import { ILoginData } from "./auth.type";

export async function signupWithUsername(loginData: ILoginData): Promise<IStatus> {
    const { username, password } = loginData;
    const status: IStatus = { error: '', response: null };

    status.error = isUsernameValid(username) && isPasswordValid(password) ? '' : 'username/password invalid';
    if (status.error) {
        return status;
    }

    status.error = await isUsernameUnique(username) ? '' : 'duplicate username';
    if (status.error) {
        return status;
    }

    let userID;
    const password_hash = await toHash(password);

    try {
        const user = await addUser({ username, password_hash });
        userID = user.rows[0].id;
    } catch (error) {
        status.error = String(error);
    }
    if (status.error) {
        return status;
    }

    // ONLY SUCCESS CASE
    const token = getToken(userID);
    status.response = token;
    return status;
}

export async function loginWithUsername(loginData: ILoginData): Promise<IStatus> {
    const { username, password: input } = loginData;
    const status: IStatus = { error: '', response: null };

    status.error = isUsernameValid(username) && isPasswordValid(input) ? '' : 'username/password invalid';
    if (status.error) {
        return status;
    }

    let queryResult;
    try {
        queryResult = await findUserByUsername(username);
        status.error = queryResult?.rows.length !== 1 ? `user doesn't exist` : '';
    } catch (error) {
        status.error = String(error);
    }
    if (status.error) {
        return status;
    }

    const user: IUser = queryResult?.rows[0];
    const storedHashPass = user?.password_hash;
    status.error = !await compare(input, storedHashPass) ? 'username/password incorrect' : '';
    if (status.error) {
        return status;
    }

    // ONLY SUCCESS CASE
    const token = getToken(user.id);
    status.response = token;
    return status;
}

function isUsernameValid(value: string): boolean {
    // Valid username - min 1 letter, max 15 letters, contains only a-z, A-Z, 0-9, ., _
    const parsedValue = getParsedValue(value);
    const regex = getUsernameRegex();
    return parsedValue?.length >= 1 && parsedValue.length <= 15 && regex.test(parsedValue);
}

function isPasswordValid(value: string): boolean {
    // Valid password - 4-20 character length
    const parsedValue = getParsedValue(value);
    return parsedValue?.length >= 4 && parsedValue.length <= 20;
}

function getParsedValue(value: string): string {
    return typeof value === 'string' && value !== null && value !== undefined && value.trim() ? value : '';
}

function getUsernameRegex() {
    return new RegExp('^[a-zA-Z0-9._]+$');
}

async function isUsernameUnique(value: string): Promise<boolean> {
    const result = await findUserByUsername(value);
    return result.rowCount !== null && result.rowCount === 0;
}
