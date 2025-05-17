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

export default function DeleteButton() {
  const [session, setSession] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  const getSession = async () => {
    const result = await authClient.getSession();
    setSession(result.data?.session);
  };

  const handleDelete = async () => {
    console.log("Deleting post");
    setOpen(false);
  };

  useEffect(() => {
    getSession();
  }, []);

  if (!session) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer flex items-center gap-1.5 py-2 px-3 rounded-lg hover:bg-zinc-100 focus:bg-zinc-200 transition-all ease-in-out duration-200 h-fit my-auto"
      >
        <Trash size={16} />
        Eliminar
      </button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar publicación</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de querer eliminar esta publicación?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Eliminar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
