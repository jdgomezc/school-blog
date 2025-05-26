import authClient from "../lib/auth-client";
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

export default function EditButton() {
  const [session, setSession] = useState<any | null>(null);

  const getSession = async () => {
    const result = await authClient.getSession();
    setSession(result.data?.session);
  };

  useEffect(() => {
    getSession();
  }, []);

  const handleEditRedirect = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    window.location.href = `/post/edit?id=${postId}`;
  };

  if (!session) {
    return null;
  }

  return (
    <button
      onClick={handleEditRedirect}
      className="text-sm md:text-base cursor-pointer flex items-center gap-1.5 py-2 px-3 rounded-lg hover:bg-zinc-100 focus:bg-zinc-200 transition-all ease-in-out duration-200 h-fit my-auto"
    >
      <Pencil className="my-auto size-4 md:size-5" />
      Editar
    </button>
  );
}
