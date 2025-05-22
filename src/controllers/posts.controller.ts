import { getPosts, agregarPost, updatePost, getUserId, getPostsFiltered } from "@/services";

export const PostsController = {
    async getPosts() {
        try {
            const posts = await getPosts();
            return new Response(JSON.stringify(posts), { status: 200 });
        } catch (error) {
            console.error('Error getting posts:', error);
            return new Response(JSON.stringify({ error: 'Error getting posts' }), { status: 500 });
        }
    },

    async getPostsFiltered(request: Request) {
        try {
            const params = new URL(request.url).searchParams;
            const type = params.get('type') as PostType;
            const posts = await getPostsFiltered(type);
            return new Response(JSON.stringify(posts), { status: 200 });
        } catch (error) {
            console.error('Error getting posts:', error);
            return new Response(JSON.stringify({ error: 'Error getting posts' }), { status: 500 });
        }
    },

    async addPost(request: Request) {
        try {
            const body = await request.json();
            const user = await getUserId(body.email);
            if (!user){
                return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
            }
            const newPost = {
                title: body.title,
                description: body.description,
                file_url: body.file_url,
                file_download_url: body.file_download_url,
                type: body.type,
                file_name: body.file_name,
            };
            const post = agregarPost(user.id, newPost);
            return new Response(JSON.stringify(post), { status: 200 });           
        } catch (error) {
            return new Response(JSON.stringify({ error: 'Error adding post' }), { status: 500 });
        }
    },

    async editPost(request: Request) {
        try {
            console.log('Editing post');
            const body = await request.json();
            const postId = body.id;
            let updatedPost: Partial<PostAPublicar> = {
                title: body.title,
                description: body.description,
                type: body.type,
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
            return new Response(JSON.stringify({ error: 'Error updating post' }), { status: 500 });
        }
    }
}