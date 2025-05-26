import { jsxs, jsx } from 'react/jsx-runtime';
import { L as Logo } from './Layout_BpJ0huSf.mjs';
import { A as APP_URL } from './client_550KDs2Y.mjs';
import { Loader2, ChevronLeft } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';

function PostPreview({ post }) {
  const { id, title, description, date, type, author } = post;
  const months = [
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
    "Diciembre"
  ];
  const post_types = {
    POST: "Publicación",
    ANNOUNCEMENT: "Anuncio",
    MEETING: "Convocatoria",
    SCHEDULE: "Cronograma"
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
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: `/post?id=${id}`,
      className: `bg-[#eee] rounded-lg p-4 pt-8 border-1 w-72 md:w-96 h-72 justify-between flex flex-col relative hover:scale-105 duration-300 ease-in-out cursor-pointer ${border_color}`,
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: `flex flex-row gap-1 absolute -top-4 left-4 bg-[#eee] rounded-md border-1 px-2 py-1 ${border_color}`,
            children: [
              /* @__PURE__ */ jsx("p", { children: post_types[type] }),
              /* @__PURE__ */ jsx("div", { className: "my-auto", children: type === "POST" ? /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm2 4v2h10V7H7zm0 4v2h10v-2H7zm0 4v2h7v-2H7z",
                  fill: "currentColor"
                }
              ) }) : type == "ANNOUNCEMENT" ? /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                "path",
                {
                  fill: "currentColor",
                  d: "M12 8H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h3l5 4V4zm9.5 4c0 1.71-.96 3.26-2.5 4V8c1.53.75 2.5 2.3 2.5 4"
                }
              ) }) : type == "MEETING" ? /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                "path",
                {
                  fill: "currentColor",
                  d: "M3 16V5.75a1.25 1.25 0 0 1 2.5 0V12h1V2.75a1.25 1.25 0 0 1 2.5 0V12h1V1.25a1.25 1.25 0 0 1 2.5 0V12h1V3.25a1.25 1.25 0 0 1 2.5 0V15h.75l1.41-3.53c.22-.55.68-.97 1.24-1.16l.79-.26a1 1 0 0 1 1.24 1.32L18.4 19c-1.21 3-4.14 5-7.4 5c-4.42 0-8-3.58-8-8"
                }
              ) }) : /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
                "path",
                {
                  fill: "currentColor",
                  d: "M13 3v6h8V3m-8 18h8V11h-8M3 21h8v-6H3m0-2h8V3H3z"
                }
              ) }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("section", { className: "flex flex-row justify-start md:justify-between gap-2", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: author.image,
              alt: author.name,
              className: "w-10 h-10 rounded-full"
            }
          ),
          /* @__PURE__ */ jsxs("article", { className: "flex flex-col md:flex-row gap-0", children: [
            /* @__PURE__ */ jsxs("section", { className: "my-auto", children: [
              /* @__PURE__ */ jsxs("h2", { className: "leading-none text-base font-bold", children: [
                author.name,
                " ",
                author.surname
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm", children: author.role })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs md:text-base text-zinc-500", children: [
              months[new Date(date)?.getMonth()].slice(0, 3),
              " ",
              new Date(date)?.getDate(),
              ", ",
              new Date(date)?.getFullYear()
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "font-bold text-lg mb-2", children: [
            title.slice(0, 65),
            title.length > 65 ? "..." : ""
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-base", children: [
            description.slice(0, 180),
            description.length > 180 ? "..." : ""
          ] })
        ] }),
        /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx("button", { type: "button", className: "bg-zinc-300 px-4 py-2 cursor-pointer", children: "LEER MÁS >" }) })
      ]
    }
  );
}

function Posts({ type }) {
  const [posts, setPosts] = useState();
  const getPosts = async () => {
    try {
      const res = await fetch(`${APP_URL}/api/posts/index.json`, {
        method: "GET"
      });
      const posts2 = await res.json();
      setPosts(posts2);
    } catch {
      setPosts(null);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);
  if (posts === void 0) {
    return /* @__PURE__ */ jsx("article", { className: "flex flex-1 justify-center items-center", children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) });
  }
  if (posts === null) {
    return /* @__PURE__ */ jsxs("article", { className: "flex flex-1 justify-center items-center", children: [
      /* @__PURE__ */ jsx("p", { children: "Error al cargar las publicaciones" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: getPosts,
          className: "bg-blue-500 text-white p-2 rounded-md",
          children: "Reintentar"
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => window.history.back(),
          type: "button",
          className: "mx-auto mt-4 flex flex-row gap-1 pr-4 cursor-pointer p-2 rounded-lg mb-2 2xl:mb-8 w-fit select-none hover:bg-zinc-100 focus:bg-zinc-200 transition-all ease-in-out duration-200",
          children: [
            /* @__PURE__ */ jsx(ChevronLeft, { className: "my-auto size-6" }),
            /* @__PURE__ */ jsx("span", { className: "text-lg 2xl:text-xl", children: "Regresar" })
          ]
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("article", { className: "px-8 2xl:px-24 flex-1 py-16 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-y-16 w-full justify-items-center relative h-full", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 -z-10",
        style: {
          backgroundImage: `url(${Logo.src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
          opacity: 0.15
          // Adjust opacity for "clean" effect, 0.05 for very subtle
        }
      }
    ),
    posts.filter((post) => type ? post.type === type : true).map((post, i) => /* @__PURE__ */ jsx(PostPreview, { post }, i))
  ] });
}

export { Posts as P };
