import { Upload, Loader2, Save } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useEffect } from "react";
import { useState } from "react";
import authClient from "../lib/auth-client";
import { APP_URL } from "astro:env/client";

interface Props {
  posts: Post[];
}

export default function Edit({ posts }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const post_types = ["POST", "ANNOUNCEMENT", "MEETING", "SCHEDULE"];
  const [post, setPost] = useState<Post | null | undefined>();
  const [session, setSession] = useState<any | null>(null);

  const [postData, setPostData] = useState({
    title: post?.title,
    description: post?.description,
    postType: post?.type || "POST",
  });
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);

  const getSession = async () => {
    const result = await authClient.getSession();
    setSession(result.data?.session);
  };

  const getPostId = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const post = posts.find((p: Post) => p.id.toString() === id);
    setPost(post ?? null);
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
        postType: post.type || "POST",
      });
    }
  }, [post]);

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

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileUploaded(e.target.files?.[0] || null);
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);

    try {
      let fileResult: any;
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
          file_name: fileUploaded ? fileUploaded.name : null,
        }),
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
                key={tipo}
                variant={"outline"}
                className={`px-3 py-1 text-sm cursor-pointer hover:bg-primary hover:text-white ${
                  post_types[i] === postData.postType
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
                onClick={() => {
                  setPostData({
                    ...postData,
                    postType: post_types[i] as PostType,
                  });
                }}
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
              className="px-2 py-4 border rounded-sm !text-lg"
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
              value={postData.title}
              disabled={loading}
            />
            <Textarea
              id="description"
              placeholder="Descripción"
              className="p-2 border rounded-sm text-sm resize-none h-36"
              rows={15}
              onChange={(e) =>
                setPostData({ ...postData, description: e.target.value })
              }
              value={postData.description}
              disabled={loading}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-auto">
            <section className="flex flex-col gap-2">
              <h2 className="text-sm">Adjunte un archivo</h2>
              <Button
                variant="outline"
                className="flex items-center gap-2 w-fit text-sm"
                disabled={loading}
              >
                <Upload size={14} />
                <input
                  type="file"
                  id="input"
                  onChange={handleFileChange}
                  className="w-64"
                />
              </Button>
            </section>
            <Button
              id="publish-button"
              className="flex items-center gap-2 !w-24 text-sm"
              onClick={handleSubmit}
              disabled={loading}
            >
              {!loading ? (
                <>
                  <Save size={14} /> Guardar
                </>
              ) : (
                <Loader2 size={14} className="animate-spin" />
              )}
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
