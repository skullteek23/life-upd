import AuthToken from "@utils/jwt";
import { compare, toHash } from "../../utils/password";
import { addUser, findUserByUsername } from "../users/users.repository";
import { IUser } from "../users/users.type";
import { ILoginData, ITokenResult, RefreshTokenPayload } from "./auth.type";
import { AUTH_ERRORS } from '@utils/constants';

export const REFRESH_TOKEN_COOKIE_KEY = 'refreshToken';

export async function signupWithUsername(loginData: ILoginData): Promise<ITokenResult> {
    const { username, password } = loginData;

    if (!isUsernameValid(username) || !isPasswordValid(password)) {
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

    const accessToken = AuthToken.get({ userID }, 'access');
    const refreshToken = AuthToken.get({ userID }, 'refresh');
    return { accessToken, refreshToken };
}

export async function loginWithUsername(loginData: ILoginData): Promise<ITokenResult> {
    const { username, password } = loginData;

    if (!isUsernameValid(username) || !isPasswordValid(password)) {
        throw new Error(AUTH_ERRORS.badFormat);
    }

    let queryResult;
    try {
        queryResult = await findUserByUsername(username);
    } catch (error: any) {
        throw new Error(error.message);
    }

    if (queryResult?.rows.length !== 1) {
        throw new Error(AUTH_ERRORS.userNotExist);
    }

    const user: IUser = queryResult?.rows[0];
    const storedHashPass = user?.password_hash;
    if (!await compare(password, storedHashPass)) {
        throw new Error(AUTH_ERRORS.passwordIncorrect);
    }

    const accessToken = AuthToken.get({ userID: user.id }, 'access');
    const refreshToken = AuthToken.get({ userID: user.id }, 'refresh');
    return { accessToken, refreshToken };
}

export function validateTokens(token: string): ITokenResult {
    const payload = AuthToken.verify(token, 'refresh');
    const newPayload = { userID: (payload as RefreshTokenPayload)?.userID };
    if (payload) {
        const newAccessToken = AuthToken.get(newPayload, 'access');
        const newRefreshToken = AuthToken.get(newPayload, 'refresh');
        return { accessToken: newAccessToken, refreshToken: newRefreshToken }
    }
    throw new Error(AUTH_ERRORS.unauthorizedAccess);
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
