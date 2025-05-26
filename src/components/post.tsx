import {
  ChevronLeft,
  FileText,
  Download,
  Loader2,
  Link,
  Megaphone,
  Calendar,
  Grid,
  MessageSquare,
} from "lucide-react";
import EditButton from "@/components/EditButton";
import DeleteButton from "@/components/DeleteButton";
import { useEffect, useMemo, useState } from "react";
import { APP_URL } from "astro:env/client";

export default function Post() {
  const [post, setPost] = useState<Post | null | undefined>();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const res = await fetch(`${APP_URL}/api/posts/index.json`, {
      method: "GET",
    });

    const posts = await res.json();

    // get /post&id={postId} from the url
    // get query params
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    const post = posts.find(
      (post: Post) => post.id.toString() === postId?.toString()
    );

    if (!post) {
      setPost(null);
      return;
    }

    setPost(post);
  };

  const border_color = useMemo(() => {
    if (!post) return "border-[#ccc]";

    switch (post?.type) {
      case "ANNOUNCEMENT":
        return "border-[#FFA7A7]";
      case "MEETING":
        return "border-[#FFCC91]";
      case "SCHEDULE":
        return "border-[#8194FF]";
      default:
        return "border-[#ccc]";
    }
  }, [post]);

  const post_types: Record<string, string> = {
    POST: "Publicación",
    ANNOUNCEMENT: "Anuncio",
    MEETING: "Convocatoria",
    SCHEDULE: "Cronograma",
  };

  const months: string[] = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  if (post === undefined)
    return (
      <article className="w-full h-full flex flex-1 justify-center items-center">
        <Loader2 className="my-auto size-6 animate-spin" />
      </article>
    );

  if (post === null)
    return (
      <article className="w-full h-full flex flex-1 flex-col justify-center items-center">
        <h2 className="text-4xl 2xl:text-7xl pb-1 2xl:pb-4 font-bold border-b-1 mb-2 2xl:mb-8">
          <b>404</b>
        </h2>
        <p className="text-lg 2xl:text-xl">
          La publicación que buscas no existe.
        </p>
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

  return (
    <article className="px-0 md:px-40">
      <section className="flex flex-row justify-between mb-4 md:mb-8">
        <button
          onClick={() => window.history.back()}
          type="button"
          className="-ml-3 flex flex-row gap-1 pr-4 cursor-pointer p-2 rounded-lg w-fit select-none hover:bg-zinc-100 focus:bg-zinc-200 transition-all ease-in-out duration-200"
        >
          <ChevronLeft className="my-auto size-4 md:size-6" />
          <span className="text-sm md:text-lg 2xl:text-xl">Regresar</span>
        </button>
        <article className="flex flex-row gap-0">
          <EditButton />
          <DeleteButton postId={post ? parseInt(post.id) : undefined} />
        </article>
      </section>
      <h1
        className={`text-2xl md:text-4xl 2xl:text-7xl pb-1 2xl:pb-4 font-bold border-b-1 mb-2 2xl:mb-8 ${border_color}`}
      >
        {post?.title}
      </h1>
      <section className="flex flex-col mb-4 2xl:mb-16">
        <article className="flex flex-row gap-1">
          <p className="text-xs md:text-xl 2xl:text-3xl font-light">
            {post_types[post?.type ?? "POST"]}
          </p>
          <div className="my-auto">
            {post?.type === "POST" ? (
              <MessageSquare className="my-auto size-4 md:size-6 text-zinc-500" />
            ) : post?.type === "ANNOUNCEMENT" ? (
              <Megaphone className="my-auto size-4 md:size-6 text-zinc-500" />
            ) : post?.type === "MEETING" ? (
              <Calendar className="my-auto size-4 md:size-6 text-zinc-500" />
            ) : (
              <Grid className="my-auto size-4 md:size-6 text-zinc-500" />
            )}
          </div>
        </article>
        <p className="text-xs md:text-base 2xl:text-lg text-zinc-400">
          {months[new Date(post?.date ?? "").getMonth()]}{" "}
          {new Date(post?.date ?? "").getDate()},{" "}
          {new Date(post?.date ?? "").getFullYear()}
        </p>
      </section>
      <section className="flex flex-col gap-4 mb-4 2xl:mb-0 2xl:gap-12">
        <article className="flex flex-row justify-between">
          <article className="flex flex-row gap-2">
            <img
              src={post?.author.image}
              alt={post?.author.name}
              className="size-8 md:size-12 2xl:size-18 rounded-full"
            />
            <section className="my-auto">
              <h2 className="leading-none text-sm md:text-base 2xl:text-2xl font-bold">
                {`${post?.author.name} ${post?.author.surname}`}
              </h2>
              <p className="text-xs md:text-sm 2xl:text-lg text-zinc-500">
                {post?.author.role}
              </p>
            </section>
          </article>
        </article>
        {post?.file_url && (
          <article className="flex flex-row gap-2">
            <a
              href={post?.file_url}
              target="_blank"
              className="flex flex-row gap-1 text-xs md:text-base"
            >
              <FileText className="my-auto size-4 md:size-5" />{" "}
              {post?.file_name ?? "Archivo adjunto"}
            </a>
            <a
              href={post?.file_download_url}
              target="_blank"
              className="my-auto"
            >
              <Download className="size-4 md:size-5 my-auto" />
            </a>
          </article>
        )}
        <p className="text-sm pt-4 md:text-xl 2xl:text-4xl leading-8 2xl:leading-14">
          {post?.description}
        </p>
      </section>
    </article>
  );
}
