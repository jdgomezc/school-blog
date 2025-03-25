import { db } from "../database";

export const getPosts = async () => {
  return await db
    .selectFrom('post')
    .leftJoin('user', 'user.id', 'post.usuario_id')
    .select([
      "post.id",
      "post.title",
      "post.description",
      "post.file_url",
      "post.file_download_url",
      "post.type",
      "post.date",
      "user.name",
      "user.surname",
      "user.image",
      "user.role",
    ])
    .orderBy('post.date', 'desc')
    .execute()
    .then(results => {
      return results.map((result) => {
        const { name, surname, image, role, ...post } = result;

        return {
          ...post,
          author: {
            name: name,
            surname: surname,
            image: image,
            role: role,
          }
        };
      });
    });
}

export const getPostsFiltered = async (type: PostType) => {
  return await db
    .selectFrom('post')
    .leftJoin('user', 'user.id', 'post.usuario_id')
    .select([
      "post.id",
      "post.title",
      "post.description",
      "post.file_url",
      "post.file_download_url",
      "post.type",
      "post.date",
      "user.name",
      "user.surname",
      "user.image",
      "user.role",
    ])
    .where('type', '=', type)
    .orderBy('post.date', 'desc')
    .execute()
    .then(results => {
      return results.map((result) => {
        const { name, surname, image, role, ...post } = result;

        return {
          ...post,
          author: {
            name: name,
            surname: surname,
            image: image,
            role: role,
          }
        };
      });
    });
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