import { db } from "@/database"

export const getUserId = async (username: string) => {
    return await db
        .selectFrom('user')
        .select('id')
        .where('username', '=', username)
        .executeTakeFirst();
}