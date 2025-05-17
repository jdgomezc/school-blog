import authClient from "../lib/auth-client";
import { useEffect, useState } from "react";

export default function Logout() {
  const [session, setSession] = useState<any | null>(null);

  const getSession = async () => {
    const result = await authClient.getSession();
    setSession(result.data?.session);
  };

  useEffect(() => {
    getSession();
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  if (!session) {
    return null;
  }

  return (
    <button onClick={handleLogout} className="cursor-pointer">
      Cerrar sesión
    </button>
  );
}
