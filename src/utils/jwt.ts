import jsonwebtoken, { decode } from "jsonwebtoken";

export function getToken(data: any): string {
    try {
        return jsonwebtoken.sign(data, getSecret());
    } catch (error) {
        console.log('Error getting token: ', error);
        return '';
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
        console.log('Error verifying token: ', error);
        return false;
    }
}

export function decodeToken(token: string): string {
    return String(decode(token));
}

function getSecret(): string {
    return process.env.JWT_SECRET_KEY || '';
}