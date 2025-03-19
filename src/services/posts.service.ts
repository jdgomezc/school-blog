import { db } from "../database";

export const getPosts = async () => {
  return await db
    .selectFrom('post')
    .selectAll()
    .orderBy('fecha_creacion', 'desc')
    .execute();
}

export const agregarPost = async (userId: number, newPost: PostAPublicar) => {
  return await db.insertInto("post")
  .values({
    usuario_id: userId,
    texto: newPost.texto,
    imagen_url: newPost.imagenUrl,
    pdf_uri: newPost.pdfUri,
    pdf_descarga: newPost.pdfDescarga,
    tipo_publicacion: newPost.tipoPublicacion
  })
}