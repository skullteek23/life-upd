import { USER_ERRORS } from "@utils/constants";
import { findUserByID } from "./users.repository";

export async function getUser(userId: number) {
    if (!userId) {
        throw new Error(USER_ERRORS.invalidUserId);
    }

    const result = await findUserByID(Number(userId));
    if (result?.length > 1) {
        throw new Error(USER_ERRORS.duplicateUsers);
    }

    return result[0];
}