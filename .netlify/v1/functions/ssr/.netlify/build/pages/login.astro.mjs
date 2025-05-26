import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DLxTQpo-.mjs';
import 'kleur/colors';
import { a as authClient, $ as $$Layout } from '../chunks/Layout_BpJ0huSf.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { c as cn } from '../chunks/utils_B05Dmz_H.mjs';
import { I as Input } from '../chunks/input_CLi1jCRP.mjs';
import { B as Button } from '../chunks/button_CyJvVclM.mjs';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
export { renderers } from '../renderers.mjs';

function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}

function Login() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    getSession();
  }, []);
  const getSession = async () => {
    const result = await authClient.getSession();
    setSession(result.data?.session);
  };
  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await authClient.signIn.username({
        username,
        password
      });
      if (result.error) {
        toast.error("Credenciales inválidas", {
          description: "Intente nuevamente"
        });
        return;
      }
      toast("Bienvenido");
      window.location.href = "/publish";
    } catch {
      toast.error("Error al iniciar sesión", {
        description: "Intente más tarde"
      });
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex-1 grid place-items-center", children: !session ? /* @__PURE__ */ jsxs("div", { className: "max-w-md px-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-2 text-center", children: "Iniciar sesión" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6 text-center", children: "Ingresa tus credenciales para poder publicar." }),
    /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-white p-6 shadow-md border border-gray-300 h-fit", children: /* @__PURE__ */ jsxs("form", { id: "login-form", className: "space-y-4 h-full flex flex-col", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { className: "mb-2 block", htmlFor: "username", children: "Usuario" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "username",
            type: "text",
            placeholder: "Ingrese su usuario",
            required: true,
            value: username,
            onChange: (e) => setUsername(e.target.value),
            disabled: loading
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { className: "mb-2 block", htmlFor: "password", children: "Contraseña" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "password",
            type: "password",
            placeholder: "Ingrese su contraseña",
            required: true,
            value: password,
            onChange: (e) => setPassword(e.target.value),
            disabled: loading
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-between items-center gap-3 mt-2 w-full", children: /* @__PURE__ */ jsx(
        Button,
        {
          onClick: handleLogin,
          className: "w-full flex cursor-pointer",
          type: "button",
          disabled: loading,
          children: loading ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : "Iniciar sesión"
        }
      ) })
    ] }) })
  ] }) : /* @__PURE__ */ jsxs("article", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsx("p", { children: "Ya tienes una sesión activa" }),
    /* @__PURE__ */ jsx("a", { href: "/publish", children: "Realizar publicaciones" })
  ] }) });
}

const prerender = false;
const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SignIn", Login, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/login", "client:component-export": "default" })} ` })}`;
}, "/Users/jdgomez/UVG/extension_hours/school-blog/src/pages/login.astro", void 0);

const $$file = "/Users/jdgomez/UVG/extension_hours/school-blog/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
