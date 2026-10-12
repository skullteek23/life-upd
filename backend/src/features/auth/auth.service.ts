import { getToken } from "../../utils/jwt";
import { compare, toHash } from "../../utils/password";
import { addUser, findUserByUsername } from "../users/users.repository";
import { IUser } from "../users/users.type";
import { ILoginData } from "./auth.type";
import { AUTH_ERRORS } from 'src/utils/constants';

export async function signupWithUsername(loginData: ILoginData): Promise<string> {
    const { username, password } = loginData;

    if (!isUsernameValid(username) || isPasswordValid(password)) {
        throw new Error(AUTH_ERRORS.badFormat);
    }

    if (!await isUsernameUnique(username)) {
        throw new Error(AUTH_ERRORS.usernameDuplicate);
    }

    let userID;
    const password_hash = await toHash(password);

    try {
        const user = await addUser({ username, password_hash });
        userID = user.rows[0].id;
    } catch (error) {
        throw new Error(AUTH_ERRORS.signupServerFailure);
    }

    const token = getToken(userID);
    return token;
}

export async function loginWithUsername(loginData: ILoginData): Promise<string> {
    const { username, password } = loginData;

    if (!isUsernameValid(username) || isPasswordValid(password)) {
        throw new Error(AUTH_ERRORS.badFormat);
    }

    let queryResult;
    try {
        queryResult = await findUserByUsername(username);
        if (queryResult?.rows.length !== 1) {
            throw new Error(AUTH_ERRORS.userNotExist);
        }
    } catch (error: any) {
        throw new Error(error.message);
    }

    const user: IUser = queryResult?.rows[0];
    const storedHashPass = user?.password_hash;
    if (!await compare(password, storedHashPass)) {
        throw new Error(AUTH_ERRORS.passwordIncorrect);
    }

    const token = getToken(user.id);
    return token;
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
    try {
        const result = await findUserByUsername(value);
        return result.rowCount !== null && result.rowCount === 0;
    } catch (error) {
        throw new Error(AUTH_ERRORS.duplicateCheckFailed);
    }
}
