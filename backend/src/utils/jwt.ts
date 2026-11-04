import jsonwebtoken from "jsonwebtoken";
import { AUTH_ERRORS } from "./constants";
import { AccessTokenPayload, RefreshTokenPayload, TokenType } from "@features/auth/auth.type";

class JWT {
    static get(data: any, secret: string, opts: jsonwebtoken.SignOptions): string {
        try {
            return jsonwebtoken.sign(data, secret, { ...opts });
        } catch (error: any) {
            console.log(error.message)
            throw new Error(AUTH_ERRORS.tokenFailure)
        }
    }

    static verify(token: string, secret: string): string | jsonwebtoken.JwtPayload {
        try {
            const result = jsonwebtoken.verify(token, secret);
            return result;
        } catch (error: any) {
            if (error.message === 'jwt expired') {
                throw new Error(AUTH_ERRORS.tokenExpired);
            }
            throw new Error(AUTH_ERRORS.unauthorizedAccess);
        }
    }


}

class AuthJWT {
    static #getPayload(type: TokenType, data: any): AccessTokenPayload | RefreshTokenPayload {
        switch (type) {
            case 'access':
                return {
                    userID: null,
                    ...data
                } as AccessTokenPayload;
            case 'refresh':
                return {
                    userID: null,
                    ...data
                } as RefreshTokenPayload;
        };
    }

    static #getOptions(type: TokenType, opts?: jsonwebtoken.SignOptions): jsonwebtoken.SignOptions {
        switch (type) {
            case 'access':
                return {
                    expiresIn: '30m',
                    ...opts
                }
            case 'refresh':
                return {
                    expiresIn: '1d',
                    ...opts
                }
        };
    }

    static get(data: any, type: TokenType) {
        return JWT.get(this.#getPayload(type, data), this.#getSecret(type), this.#getOptions(type));
    }

    static verify(token: string, type: TokenType) {
        try {
            return JWT.verify(token, this.#getSecret(type));
        } catch (error: any) {
            if (type === 'refresh' && error.message === AUTH_ERRORS.tokenExpired) {
                throw new Error(AUTH_ERRORS.unauthorizedAccess);
            }
            throw new Error(error.message);
        }
    }

    static #getSecret(type: TokenType): string {
        switch (type) {
            case 'access':
                return this.#getAccessSecret();
            case 'refresh':
                return this.#getRefreshSecret();
        };
    }

    static #getAccessSecret(): string {
        return process.env.JWT_ACCESS_TOKEN_SECRET_KEY || '';
    }
    static #getRefreshSecret(): string {
        return process.env.JWT_REFRESH_TOKEN_SECRET_KEY || '';
    }
}

export default AuthJWT;