import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import authClient from "@/lib/auth-client";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const [session, setSession] = useState<any | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
        password,
      });

      if (result.error) {
        toast.error("Credenciales inválidas", {
          description: "Intente nuevamente",
        });
        return;
      }

      toast("Bienvenido");

      window.location.href = "/publish";
    } catch {
      toast.error("Error al iniciar sesión", {
        description: "Intente más tarde",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 grid place-items-center">
      {!session ? (
        <div className="max-w-md px-4">
          <h1 className="text-2xl font-bold mb-2 text-center">
            Iniciar sesión
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Ingresa tus credenciales para poder publicar.
          </p>
          <div className="rounded-lg bg-white p-6 shadow-md border border-zinc-500 h-fit">
            <form id="login-form" className="space-y-4 h-full flex flex-col">
              <div>
                <Label className="mb-2 block" htmlFor="username">
                  Usuario
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Ingrese su usuario"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <Label className="mb-2 block" htmlFor="password">
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingrese su contraseña"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col justify-between items-center gap-3 mt-2 w-full">
                <Button
                  onClick={handleLogin}
                  className="w-full flex cursor-pointer"
                  type="button"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Iniciar sesión"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <article className="flex flex-col gap-2">
          <p>Ya tienes una sesión activa</p>
          <a href="/publish">Realizar publicaciones</a>
        </article>
      )}
    </div>
  );
}
