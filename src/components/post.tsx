import { ChevronLeft, FileText, Download, Loader2, Link } from "lucide-react";
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
    <article className="px-40">
      <section className="flex flex-row justify-between">
        <button
          onClick={() => window.history.back()}
          type="button"
          className="-ml-3 flex flex-row gap-1 pr-4 cursor-pointer p-2 rounded-lg mb-2 2xl:mb-8 w-fit select-none hover:bg-zinc-100 focus:bg-zinc-200 transition-all ease-in-out duration-200"
        >
          <ChevronLeft className="my-auto size-6" />
          <span className="text-lg 2xl:text-xl">Regresar</span>
        </button>
        <article className="flex flex-row gap-0">
          <EditButton />
          <DeleteButton postId={post ? parseInt(post.id) : undefined} />
        </article>
      </section>
      <h1
        className={`text-4xl 2xl:text-7xl pb-1 2xl:pb-4 font-bold border-b-1 mb-2 2xl:mb-8 ${border_color}`}
      >
        {post?.title}
      </h1>
      <section className="flex flex-col mb-4 2xl:mb-16">
        <article className="flex flex-row gap-2">
          <p className="text-xl 2xl:text-3xl font-light">
            {post_types[post?.type ?? "POST"]}
          </p>
          <div className="my-auto">
            {post?.type === "POST" ? (
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm2 4v2h10V7H7zm0 4v2h10v-2H7zm0 4v2h7v-2H7z"
                  fill="currentColor"
                />
              </svg>
            ) : post?.type == "ANNOUNCEMENT" ? (
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 8H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h3l5 4V4zm9.5 4c0 1.71-.96 3.26-2.5 4V8c1.53.75 2.5 2.3 2.5 4"
                />
              </svg>
            ) : post?.type == "MEETING" ? (
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M3 16V5.75a1.25 1.25 0 0 1 2.5 0V12h1V2.75a1.25 1.25 0 0 1 2.5 0V12h1V1.25a1.25 1.25 0 0 1 2.5 0V12h1V3.25a1.25 1.25 0 0 1 2.5 0V15h.75l1.41-3.53c.22-.55.68-.97 1.24-1.16l.79-.26a1 1 0 0 1 1.24 1.32L18.4 19c-1.21 3-4.14 5-7.4 5c-4.42 0-8-3.58-8-8"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M13 3v6h8V3m-8 18h8V11h-8M3 21h8v-6H3m0-2h8V3H3z"
                />
              </svg>
            )}
          </div>
        </article>
        <p className="text-md 2xl:text-lg text-zinc-400">
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
              className="w-12 2xl:w-18 h-12 2xl:h-18 rounded-full"
            />
            <section className="my-auto">
              <h2 className="leading-none text-md 2xl:text-2xl font-bold">
                {post?.author.name}
              </h2>
              <p className="text-sm 2xl:text-xl text-zinc-500">
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
              className="flex flex-row gap-1"
            >
              <FileText className="my-auto size-5" />{" "}
              {post?.file_name ?? "Cronograma"}
            </a>
            <a
              href={post?.file_download_url}
              target="_blank"
              className="my-auto"
            >
              <Download className="size-5" />
            </a>
          </article>
        )}
        <p className="text-xl 2xl:text-4xl leading-8 2xl:leading-14">
          {post?.description}
        </p>
      </section>
    </article>
  );
}
