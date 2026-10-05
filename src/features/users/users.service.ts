import { findAllUsers } from "./users.repository";
import { IUser } from "./users.type";

export function getAllUsers(): Promise<IUser[]> {
    return findAllUsers()
        .then(sortUsers);
}

function sortUsers(data: IUser[]): IUser[] {
    return data.sort();
}