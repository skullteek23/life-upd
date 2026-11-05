export interface ILoginData { username: string, password: string };
export interface ITokenResult { accessToken: string, refreshToken: string }
export type AccessTokenPayload = { userID: number };
export type RefreshTokenPayload = { userID: number };
export type TokenType = 'refresh' | 'access';