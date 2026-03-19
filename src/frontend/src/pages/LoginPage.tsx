import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const isAdmin = username === "adminlspbea";
    const ok = login(username, password);
    if (ok) {
      navigate({ to: isAdmin ? "/admin" : "/" });
    } else {
      setError("Nama akun atau kata sandi salah.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="/assets/generated/lspbea-building-logo-transparent.dim_200x200.png"
            alt="LSPBEA Indonesia"
            className="h-16 w-16 object-contain mx-auto mb-3"
          />
          <h1 className="text-2xl font-bold text-primary">LSPBEA Indonesia</h1>
          <p className="text-muted-foreground mt-1">Masuk ke akun Anda</p>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username">Nama Akun</Label>
              <Input
                id="username"
                data-ocid="login.input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan nama akun"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Kata Sandi</Label>
              <div className="relative">
                <Input
                  id="password"
                  data-ocid="login.input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p
                data-ocid="login.error_state"
                className="text-destructive text-sm"
              >
                {error}
              </p>
            )}

            <Button
              data-ocid="login.submit_button"
              type="submit"
              className="w-full"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Masuk
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Belum punya akun?{" "}
              <a
                href="/register"
                data-ocid="login.link"
                className="text-primary hover:underline font-medium"
              >
                Daftar sekarang
              </a>
            </p>
            <p className="text-sm">
              <a
                href="/reset-password"
                data-ocid="login.link"
                className="text-primary hover:underline"
              >
                Lupa kata sandi?
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
