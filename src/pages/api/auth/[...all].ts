import type { APIRoute } from "astro";
import { auth } from "../../../lib/auth";

export const ALL: APIRoute = async (ctx) => {
  return auth.handler(ctx.request);
};

export async function getStaticPaths() {
  return [
    // Add your dynamic paths here
  ];
}
