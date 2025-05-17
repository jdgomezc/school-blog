import { Send, Upload, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useEffect } from "react";
import { useState } from "react";
import authClient from "../lib/auth-client";

interface Props {
  posts: Post[];
}

export default function Edit({ posts }: Props) {
  const post_types = ["POST", "ANNOUNCEMENT", "MEETING", "SCHEDULE"];
  const [session, setSession] = useState<any | null>(null);
  const [post, setPost] = useState<Post | null | undefined>();

  const getSession = async () => {
    const result = await authClient.getSession();
    setSession(result.data?.session);
  };

  const getPostId = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    console.log("id:", id);
    const post = posts.find((p: Post) => p.id.toString() === id);
    console.log("posts:", posts);
    console.log("post:", post);
    setPost(post ?? null);
  };

  useEffect(() => {
    getPostId();
    getSession();
  }, []);

  if (!session || post === undefined) {
    return (
      <article className="flex justify-center items-center h-full w-full">
        <Loader2 className="animate-spin" />
      </article>
    );
  }

  if (post === null) {
    return (
      <article className="flex justify-center items-center h-full w-full">
        <p>Post not found</p>
      </article>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-4 shadow-lg">
      <div className="p-4 flex flex-col h-full justify-between">
        <h1 className="text-xl text-center mb-3 font-bold">
          Editar Publicación
        </h1>
        <h2 className="text-base text-center mb-3">
          Elige un tipo de publicación
        </h2>

        <div
          id="post-type-btn"
          className="flex flex-wrap justify-center gap-10 mb-3"
        >
          {["Publicaciones", "Anuncios", "Convocatorias", "Cronogramas"].map(
            (tipo, i) => (
              <Button
                datatype={post_types[i]}
                key={tipo}
                variant={"outline"}
                className={`px-3 py-1 text-sm cursor-pointer hover:bg-primary hover:text-white ${
                  post_types[i] === post.type
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                {tipo}
              </Button>
            )
          )}
        </div>

        <CardContent className="p-0 h-72 flex flex-col">
          <div className="flex flex-col gap-2">
            <Input
              id="title"
              placeholder="Título"
              className="px-2 py-4 border rounded-sm !text-lg"
              defaultValue={post.title}
            />
            <Textarea
              id="description"
              placeholder="Descripción"
              className="p-2 border rounded-sm text-sm resize-none h-36"
              rows={15}
              defaultValue={post.description}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-auto">
            <section className="flex flex-col gap-2">
              <h2 className="text-sm">Adjunte un archivo</h2>
              <Button
                variant="outline"
                className="flex items-center gap-2 w-fit text-sm"
              >
                <Upload id="input" size={14} />
                <input type="file" id="input" className="w-64" />
              </Button>
            </section>
            <Button
              id="publish-button"
              className="flex items-center gap-2 w-full sm:w-auto text-sm"
            >
              <Send size={14} /> Publicar
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
