import { d as db } from './index_DdoYMPJN.mjs';

const getPosts = async () => {
  return await db.selectFrom("post").leftJoin("user", "user.id", "post.usuario_id").select([
    "post.id",
    "post.title",
    "post.description",
    "post.file_url",
    "post.file_download_url",
    "post.type",
    "post.file_name",
    "post.date",
    "user.name",
    "user.surname",
    "user.image",
    "user.role"
  ]).orderBy("post.date", "desc").execute().then((results) => {
    return results.map((result) => {
      const { name, surname, image, role, ...post } = result;
      return {
        ...post,
        author: {
          name,
          surname,
          image,
          role
        }
      };
    });
  });
};
const getPostsFiltered = async (type) => {
  return await db.selectFrom("post").leftJoin("user", "user.id", "post.usuario_id").select([
    "post.id",
    "post.title",
    "post.description",
    "post.file_url",
    "post.file_download_url",
    "post.type",
    "post.file_name",
    "post.date",
    "user.name",
    "user.surname",
    "user.image",
    "user.role"
  ]).where("type", "=", type).orderBy("post.date", "desc").execute().then((results) => {
    return results.map((result) => {
      const { name, surname, image, role, ...post } = result;
      return {
        ...post,
        author: {
          name,
          surname,
          image,
          role
        }
      };
    });
  });
};
const agregarPost = (userId, newPost) => {
  return db.insertInto("post").values({
    usuario_id: userId,
    title: newPost.title,
    description: newPost.description,
    file_url: newPost.file_url,
    file_download_url: newPost.file_download_url,
    type: newPost.type,
    file_name: newPost.file_name
  }).execute();
};
const updatePost = (postId, updatedPost) => {
  return db.updateTable("post").set(updatedPost).where("id", "=", postId).execute();
};
const deletePost = (postId) => {
  return db.deleteFrom("post").where("id", "=", postId).execute();
};

const getUserId = async (email) => {
  return await db.selectFrom("user").select("id").where("email", "=", email).executeTakeFirst();
};

const PostsController = {
  async getPosts() {
    try {
      const posts = await getPosts();
      return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error) {
      console.error("Error getting posts:", error);
      return new Response(JSON.stringify({ error: "Error getting posts" }), { status: 500 });
    }
  },
  async getPostsFiltered(request) {
    try {
      const params = new URL(request.url).searchParams;
      const type = params.get("type");
      const posts = await getPostsFiltered(type);
      return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error) {
      console.error("Error getting posts:", error);
      return new Response(JSON.stringify({ error: "Error getting posts" }), { status: 500 });
    }
  },
  async addPost(request) {
    try {
      const body = await request.json();
      const user = await getUserId(body.email);
      if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
      }
      const newPost = {
        title: body.title,
        description: body.description,
        file_url: body.file_url,
        file_download_url: body.file_download_url,
        type: body.type,
        file_name: body.file_name
      };
      const post = agregarPost(user.id, newPost);
      return new Response(JSON.stringify(post), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Error adding post" }), { status: 500 });
    }
  },
  async editPost(request) {
    try {
      console.log("Editing post");
      const body = await request.json();
      const postId = body.id;
      let updatedPost = {
        title: body.title,
        description: body.description,
        type: body.type
      };
      if (body.file_url) {
        updatedPost.file_url = body.file_url;
      }
      if (body.file_download_url) {
        updatedPost.file_download_url = body.file_download_url;
      }
      if (body.file_name) {
        updatedPost.file_name = body.file_name;
      }
      await updatePost(postId, updatedPost);
      return new Response(JSON.stringify(updatedPost), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Error updating post" }), { status: 500 });
    }
  },
  async deletePost(request) {
    try {
      const body = await request.json();
      const postId = body.id;
      await deletePost(postId);
      return new Response(JSON.stringify({ message: "Post deleted successfully" }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Error deleting post" }), { status: 500 });
    }
  }
};

export { PostsController as P };
