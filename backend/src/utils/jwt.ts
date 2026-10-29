import jsonwebtoken, { decode } from "jsonwebtoken";
import { AUTH_ERRORS } from "./constants";

export function getToken(data: any): string {
    try {
        return jsonwebtoken.sign(data, getSecret());
    } catch (error) {
        throw new Error(AUTH_ERRORS.tokenFailure)
    }
}

export function verifyToken(token: string): boolean {
    try {
        const result = jsonwebtoken.verify(token, getSecret());
        if (result) {
            return true;
        }
        return false;
    } catch (error) {
        throw new Error(AUTH_ERRORS.unauthorizedAccess);
    }
}

export function decodeToken(token: any): string {
    return String(decode(token));
}

function getSecret(): string {
    return process.env.JWT_SECRET_KEY || '';
}