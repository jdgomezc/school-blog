import { getPosts, agregarPost, getUserId } from "@/services";

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

    async agregarPost(request: Request, username: string) {
        try {
            const user = await getUserId(username);
            const newPost = await request.json();
            if (!user){
                return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
            }
            const post = await agregarPost(user.id, newPost);
            return new Response(JSON.stringify(post), { status: 200 });           
        } catch (error) {
            return new Response(JSON.stringify({ error: 'Error adding post' }), { status: 500 });
        }
    }
}