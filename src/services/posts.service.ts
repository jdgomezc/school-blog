import { db } from "../database";

export const getPosts = async () => {
  return await db
    .selectFrom('post')
    .selectAll()
    .orderBy('date', 'desc')
    .execute();
}

export const agregarPost = (userId: number, newPost: PostAPublicar) => {
  return db.insertInto("post")
  .values({
    usuario_id: userId,
    title: newPost.title,
    description: newPost.description,
    file_url: newPost.file_url,
    file_download_url: newPost.file_download_url,
    type: newPost.type,
  }).execute();
}