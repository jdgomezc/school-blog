import Logo from "@/assets/logo.png";
import { APP_URL } from "astro:env/client";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import PostPreview from "@/components/post-preview";

interface Props {
  type?: PostType;
}

export default function Posts({ type }: Props) {
  const [posts, setPosts] = useState<Post[] | undefined | null>();

  const getPosts = async () => {
    try {
      const res = await fetch(`${APP_URL}/api/posts/index.json`, {
        method: "GET",
      });
      const posts = await res.json();
      setPosts(posts);
    } catch {
      setPosts(null);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (posts === undefined) {
    return (
      <article className="flex flex-1 justify-center items-center">
        <Loader2 className="animate-spin" />
      </article>
    );
  }

  if (posts === null) {
    return (
      <article className="flex flex-1 justify-center items-center">
        <p>Error al cargar las publicaciones</p>
        <button
          onClick={getPosts}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Reintentar
        </button>
        <button
          onClick={() => window.history.back()}
          type="button"
          className="mx-auto mt-4 flex flex-row gap-1 pr-4 cursor-pointer p-2 rounded-lg mb-2 2xl:mb-8 w-fit select-none hover:bg-zinc-100 focus:bg-zinc-200 transition-all ease-in-out duration-200"
        >
          <ChevronLeft className="my-auto size-6" />
          <span className="text-lg 2xl:text-xl">Regresar</span>
        </button>
      </article>
    );
  }

  return (
    <article className="px-8 2xl:px-24 flex-1 py-16 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-y-16 w-full justify-items-center relative h-full">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${Logo.src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
          opacity: 0.15, // Adjust opacity for "clean" effect, 0.05 for very subtle
        }}
      />
      {posts
        .filter((post) => (type ? post.type === type : true))
        .map((post, i) => (
          <PostPreview key={i} post={post} />
        ))}
    </article>
  );
}
