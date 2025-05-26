import { useMemo } from "react";

interface Props {
  post: Post;
}

export default function PostPreview({ post }: Props) {
  const { id, title, description, date, type, author } = post;

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

  // dictionary with translation to spanish of the post types
  const post_types: Record<string, string> = {
    POST: "Publicación",
    ANNOUNCEMENT: "Anuncio",
    MEETING: "Convocatoria",
    SCHEDULE: "Cronograma",
  };

  const border_color = useMemo(() => {
    switch (type) {
      case "ANNOUNCEMENT":
        return "border-[#FFA7A7]";
      case "MEETING":
        return "border-[#FFCC91]";
      case "SCHEDULE":
        return "border-[#8194FF]";
      default:
        return "border-[#ccc]";
    }
  }, [type]);

  return (
    <a
      href={`/post?id=${id}`}
      className={`bg-[#eee] rounded-lg p-4 pt-8 border-1 w-72 md:w-96 h-72 justify-between flex flex-col relative hover:scale-105 duration-300 ease-in-out cursor-pointer ${border_color}`}
    >
      <div
        className={`flex flex-row gap-1 absolute -top-4 left-4 bg-[#eee] rounded-md border-1 px-2 py-1 ${border_color}`}
      >
        <p>{post_types[type]}</p>
        <div className="my-auto">
          {type === "POST" ? (
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm2 4v2h10V7H7zm0 4v2h10v-2H7zm0 4v2h7v-2H7z"
                fill="currentColor"
              />
            </svg>
          ) : type == "ANNOUNCEMENT" ? (
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 8H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h3l5 4V4zm9.5 4c0 1.71-.96 3.26-2.5 4V8c1.53.75 2.5 2.3 2.5 4"
              />
            </svg>
          ) : type == "MEETING" ? (
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
      </div>
      <section className="flex flex-row justify-start gap-2">
        <img
          src={author.image}
          alt={author.name}
          className="w-10 h-10 rounded-full"
        />
        <article className="flex flex-col md:flex-row md:justify-between w-full">
          <section className="my-auto">
            <h2 className="leading-none text-base font-bold">
              {author.name} {author.surname}
            </h2>
            <p className="text-sm">{author.role}</p>
          </section>
          <p className="text-xs md:text-base text-zinc-500 ml-0 flex md:ml-auto">
            {months[new Date(date)?.getMonth()].slice(0, 3)}{" "}
            {new Date(date)?.getDate()}, {new Date(date)?.getFullYear()}
          </p>
        </article>
      </section>
      <section>
        <h1 className="font-bold text-lg mb-2">
          {title.slice(0, 65)}
          {title.length > 65 ? "..." : ""}
        </h1>
        <p className="text-base">
          {description.slice(0, 180)}
          {description.length > 180 ? "..." : ""}
        </p>
      </section>
      <section>
        <button type="button" className="bg-zinc-300 px-4 py-2 cursor-pointer">
          {"LEER MÁS >"}
        </button>
      </section>
    </a>
  );
}
