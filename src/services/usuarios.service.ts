import { db } from "api/database";

export const getAllUsers = async () => {
  return await db.selectFrom('usuarios').selectAll().execute();
}

export const encontrarUsuarioPorID = async (id: number) => {
  return await db.selectFrom('usuarios').selectAll().where('usuario_id', '=', id).executeTakeFirst();
}

export const encontrarUsuarioPorUsername = async (username: string) => {
  console.log("username: ", username)
  return await db.selectFrom('usuarios').selectAll().where('username', '=', username).executeTakeFirst();
}

export const crearUsuarioNuevo = async (newUserInfo: nuevoUsuario) => {
  return await db.insertInto('usuarios')
  .values({
    username: newUserInfo.usuario,
    nombre: newUserInfo.nombre,
    apellido: newUserInfo.apellido,
    password: newUserInfo.contrasena,
  })
  .returningAll()
  .executeTakeFirst();
}