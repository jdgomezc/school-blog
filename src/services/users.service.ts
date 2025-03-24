import { db } from "@/database"

export const getUserId = async (email: string) => {
    return await db
        .selectFrom('user')
        .select('id')
        .where('email', '=', email)
        .executeTakeFirst();
}