import { useEffect, useState, type ChangeEvent } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CardContent } from "@/components/ui/card";
import { Send, Upload, Loader2 } from "lucide-react";
import authClient from "@/lib/auth-client";
import { APP_URL } from "astro:env/client";
import { toast } from "sonner";

const post_types: PostType[] = ["POST", "ANNOUNCEMENT", "MEETING", "SCHEDULE"];

export default function Publish() {
  const [session, setSession] = useState<any | null | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [postType, setPostType] = useState<PostType>("POST");
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);

  useEffect(() => {
    getSession();
  }, []);

  const getSession = async () => {
    const result = await authClient.getSession();
    if (result.data?.session) {
      setSession(result.data?.session);
    } else {
      window.location.href = "/login";
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileUploaded(file || null);
  };

  const handlePublish = async () => {
    if (loading) return;

    if (!title.trim()) {
      toast.error("El título es requerido");
      return;
    }

    if (!description.trim()) {
      toast.error("La descripción es requerida");
      return;
    }

    setLoading(true);

    try {
      let fileResult;

      if (fileUploaded) {
        const uploadedResult = await fetch(`${APP_URL}/api/files/index.json`, {
          method: "POST",
          body: fileUploaded,
          headers: {
            "x-file-name": fileUploaded.name,
            "content-type": fileUploaded.type,
          },
        });

        if (!uploadedResult.ok) {
          toast.error("Error al subir el archivo a drive", {
            description:
              "Verifica que el archivo no este corrupto o no sea demasiado grande",
          });
          return;
        }

        fileResult = await uploadedResult.json();
      }
      const userSession = await authClient.getSession();

      const response = await fetch(`${APP_URL}/api/posts/index.json`, {
        method: "POST",
        body: JSON.stringify({
          email: userSession.data?.user.email,
          title: title.trim(),
          description: description.trim(),
          file_url: fileResult ? fileResult.shareableLink : "",
          file_download_url: fileResult ? fileResult.downloadLink : "",
          type: postType,
          file_name: fileResult ? fileUploaded?.name.split(".")[0] : "",
        }),
      });

      if (response.ok) {
        toast("Publicación exitosa");
        window.location.href = "/";
      } else {
        toast.error("Error al publicar la publicación", {
          description: "Intenta más tarde",
        });
        return;
      }
    } catch {
      toast.error("Error al publicar la publicación", {
        description: "Intenta más tarde",
      });
    } finally {
      setLoading(false);
      setTitle("");
      setDescription("");
      setFileUploaded(null);
    }
  };

  if (!session) {
    return (
      <article className="flex-1 grid place-items-center overflow-hidden">
        <Loader2 className="size-8 animate-spin text-primary" />
      </article>
    );
  }

  return (
    <div className="grid place-items-center overflow-hidden flex-1">
      <Card className="w-full max-w-4xl mx-4 shadow-lg border-zinc-500">
        <div className="p-4 flex flex-col h-full justify-between">
          <h1 className="text-xl text-center mb-3 font-bold">Publicar</h1>
          <h2 className="text-base text-center mb-3">
            Elige un tipo de publicación
          </h2>

          <div className="flex flex-wrap justify-center gap-2 md:gap-10 mb-3">
            {["Publicaciones", "Anuncios", "Convocatorias", "Cronogramas"].map(
              (tipo, i) => (
                <Button
                  datatype={post_types[i]}
                  key={i}
                  onClick={() => setPostType(post_types[i])}
                  variant={"outline"}
                  className={`px-3 py-1 text-sm cursor-pointer hover:bg-primary hover:text-white border-zinc-400 ${
                    postType === post_types[i] ? "bg-primary text-white" : ""
                  }`}
                  disabled={loading}
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
                className="px-2 py-4 border rounded-sm text-base"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
              />
              <Textarea
                id="description"
                placeholder="Descripción"
                className="p-2 border rounded-sm text-sm resize-none h-36"
                rows={15}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-auto">
              <section className="flex flex-col gap-2">
                <h2 className="text-sm">Adjunte un archivo</h2>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 w-fit text-sm"
                  onClick={() =>
                    document.getElementById("file-input-publish")?.click()
                  }
                  disabled={loading}
                >
                  <Upload size={14} />
                  {fileUploaded ? fileUploaded.name : "Seleccionar archivo"}
                  <input
                    type="file"
                    id="file-input-publish"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={loading}
                  />
                </Button>
              </section>
              <Button
                type="button"
                className="flex select-none mt-4 md:mt-0 items-center disabled:!cursor-not-allowed !w-24 gap-2 sm:w-auto text-sm disabled:opacity-50"
                onClick={handlePublish}
                disabled={loading || !title.trim() || !description.trim()}
              >
                {loading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Send size={14} />
                )}
                Publicar
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
