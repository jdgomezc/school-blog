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
    // Get the current path and split it into segments
    const pathSegments = window.location.pathname.split("/");
    // Filter out any empty segments that can result from leading/trailing/multiple slashes
    const nonEmptySegments = pathSegments.filter(
      (segment) => segment.length > 0
    );

    // The ID is assumed to be the last segment in the path, e.g., /post/XYZ -> ID is XYZ
    const id =
      nonEmptySegments.length > 0
        ? nonEmptySegments[nonEmptySegments.length - 1]
        : undefined;

    // Redirect to the edit page.
    // The path to the edit page is assumed to be /post/edit based on
    // file_context_2 (src/pages/post/edit.astro).
    // The original code used /edit?id=${id}. This changes it to /post/edit?id=${id}.
    // If 'id' is undefined (e.g., path was '/' or parsing failed),
    // it will redirect to /post/edit?id=undefined,
    // similar to original behavior if urlParams.get('id') was null.
    window.location.href = `/post/edit?id=${id}`;
  };

  if (!session) {
    return null;
  }

  return (
    <button
      onClick={handleEditRedirect}
      className="cursor-pointer flex items-center gap-2"
    >
      <Pencil size={16} />
      Editar
    </button>
  );
}
