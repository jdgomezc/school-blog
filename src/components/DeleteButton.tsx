import authClient from "../lib/auth-client";
import { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { APP_URL } from "astro:env/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface DeleteButtonProps {
  postId?: number;
}

export default function DeleteButton({ postId }: DeleteButtonProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [session, setSession] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getSession();
  }, []);

  const getSession = async () => {
    const result = await authClient.getSession();
    setSession(result.data?.session);
  };

  const handleDelete = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${APP_URL}/api/posts/index.json`, {
        method: "DELETE",
        body: JSON.stringify({
          id: postId,
        }),
      });

      if (!response.ok) {
        toast.error("Error al eliminar la publicación", {
          description: "Intente más tarde",
        });
        return;
      }

      toast("Publicación eliminada");
      setOpen(false);
      window.location.href = "/";
    } catch {
      toast.error("Error al eliminar la publicación", {
        description: "Intente más tarde",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!session || !postId) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-sm md:text-base cursor-pointer flex items-center gap-1.5 py-2 px-3 rounded-lg hover:bg-zinc-100 focus:bg-zinc-200 transition-all ease-in-out duration-200 h-fit my-auto"
      >
        <Trash className="my-auto size-4 md:size-5" />
        Eliminar
      </button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar publicación</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Está seguro de querer eliminar esta publicación?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
              className="md:!w-24 hover:bg-red-800"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Eliminar"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
