import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DLxTQpo-.mjs';
import 'kleur/colors';
import { a as authClient, $ as $$Layout } from '../../chunks/Layout_BpJ0huSf.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { Loader2, Upload, Save } from 'lucide-react';
import { B as Button } from '../../chunks/button_CyJvVclM.mjs';
import { C as Card, a as CardContent } from '../../chunks/card_BMnrRc33.mjs';
import { I as Input } from '../../chunks/input_CLi1jCRP.mjs';
import { T as Textarea } from '../../chunks/textarea_87YdzL6O.mjs';
import { useState, useEffect } from 'react';
import { A as APP_URL } from '../../chunks/client_550KDs2Y.mjs';
export { renderers } from '../../renderers.mjs';

function Edit({ posts }) {
  const [loading, setLoading] = useState(false);
  const post_types = ["POST", "ANNOUNCEMENT", "MEETING", "SCHEDULE"];
  const [post, setPost] = useState();
  const [session, setSession] = useState(null);
  const [postData, setPostData] = useState({
    title: post?.title,
    description: post?.description,
    postType: post?.type || "POST"
  });
  const [fileUploaded, setFileUploaded] = useState(null);
  const getSession = async () => {
    const result = await authClient.getSession();
    setSession(result.data?.session);
  };
  const getPostId = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const post2 = posts.find((p) => p.id.toString() === id);
    setPost(post2 ?? null);
  };
  useEffect(() => {
    getPostId();
    getSession();
  }, []);
  useEffect(() => {
    if (post) {
      setPostData({
        title: post.title,
        description: post.description,
        postType: post.type || "POST"
      });
    }
  }, [post]);
  if (!session || post === void 0) {
    return /* @__PURE__ */ jsx("article", { className: "flex justify-center items-center h-full w-full", children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) });
  }
  if (post === null) {
    return /* @__PURE__ */ jsx("article", { className: "flex justify-center items-center h-full w-full", children: /* @__PURE__ */ jsx("p", { children: "Post not found" }) });
  }
  const handleFileChange = (e) => {
    setFileUploaded(e.target.files?.[0] || null);
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      let fileResult;
      if (fileUploaded) {
        const uploadedResult = await fetch(`${APP_URL}/api/files/index.json`, {
          method: "POST",
          body: fileUploaded,
          headers: {
            "x-file-name": fileUploaded.name,
            "content-type": fileUploaded.type
          }
        });
        if (!uploadedResult.ok) {
          throw new Error("Upload of file failed");
        }
        fileResult = await uploadedResult.json();
      }
      const userEmail = await authClient.getSession();
      const response = await fetch("/api/posts/index.json", {
        method: "PUT",
        body: JSON.stringify({
          id: post.id,
          email: userEmail.data?.user.email,
          title: postData.title,
          description: postData.description,
          file_url: fileUploaded ? fileResult.shareableLink : null,
          file_download_url: fileUploaded ? fileResult.downloadLink : null,
          type: postData.postType,
          file_name: fileUploaded ? fileUploaded.name : null
        })
      });
      if (response.ok) {
        console.log("Post updated successfully");
        window.location.href = `/`;
      } else {
        throw new Error("Failed to update post");
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(Card, { className: "w-full max-w-4xl mx-4 shadow-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-4 flex flex-col h-full justify-between", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl text-center mb-3 font-bold", children: "Editar Publicación" }),
    /* @__PURE__ */ jsx("h2", { className: "text-base text-center mb-3", children: "Elige un tipo de publicación" }),
    /* @__PURE__ */ jsx(
      "div",
      {
        id: "post-type-btn",
        className: "flex flex-wrap justify-center gap-10 mb-3",
        children: ["Publicaciones", "Anuncios", "Convocatorias", "Cronogramas"].map(
          (tipo, i) => /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              className: `px-3 py-1 text-sm cursor-pointer hover:bg-primary hover:text-white ${post_types[i] === postData.postType ? "bg-primary text-primary-foreground" : ""}`,
              onClick: () => {
                setPostData({
                  ...postData,
                  postType: post_types[i]
                });
              },
              disabled: loading,
              children: tipo
            },
            tipo
          )
        )
      }
    ),
    /* @__PURE__ */ jsxs(CardContent, { className: "p-0 h-72 flex flex-col", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "title",
            placeholder: "Título",
            className: "px-2 py-4 border rounded-sm !text-lg",
            onChange: (e) => setPostData({ ...postData, title: e.target.value }),
            value: postData.title,
            disabled: loading
          }
        ),
        /* @__PURE__ */ jsx(
          Textarea,
          {
            id: "description",
            placeholder: "Descripción",
            className: "p-2 border rounded-sm text-sm resize-none h-36",
            rows: 15,
            onChange: (e) => setPostData({ ...postData, description: e.target.value }),
            value: postData.description,
            disabled: loading
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-center gap-2 mt-auto", children: [
        /* @__PURE__ */ jsxs("section", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-sm", children: "Adjunte un archivo" }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              className: "flex items-center gap-2 w-fit text-sm",
              disabled: loading,
              children: [
                /* @__PURE__ */ jsx(Upload, { size: 14 }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    id: "input",
                    onChange: handleFileChange,
                    className: "w-64"
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            id: "publish-button",
            className: "flex items-center gap-2 !w-24 text-sm",
            onClick: handleSubmit,
            disabled: loading,
            children: !loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Save, { size: 14 }),
              " Guardar"
            ] }) : /* @__PURE__ */ jsx(Loader2, { size: 14, className: "animate-spin" })
          }
        )
      ] })
    ] })
  ] }) });
}

const $$Astro = createAstro();
const prerender = false;
const $$Edit = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Edit;
  const apiURL = new URL("/api/posts/index.json", Astro2.url);
  const session = Astro2.locals.session;
  const posts = await fetch(apiURL, {
    method: "GET"
  }).then((res) => res.json()).then((data) => {
    return data;
  });
  if (!session) {
    return Astro2.redirect("/login");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid place-items-center overflow-hidden flex-1"> ${renderComponent($$result2, "EditCard", Edit, { "client:load": true, "posts": posts, "client:component-hydration": "load", "client:component-path": "/Users/jdgomez/UVG/extension_hours/school-blog/src/components/Edit", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/jdgomez/UVG/extension_hours/school-blog/src/pages/post/edit.astro", void 0);

const $$file = "/Users/jdgomez/UVG/extension_hours/school-blog/src/pages/post/edit.astro";
const $$url = "/post/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Edit,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
