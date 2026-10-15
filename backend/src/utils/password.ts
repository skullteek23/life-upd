import bcrypt from "bcrypt";

export async function toHash(value: string): Promise<string> {
    return await bcrypt.hash(value, 13);
}

export async function compare(input: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(input, hash);
}