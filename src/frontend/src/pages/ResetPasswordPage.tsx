import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { CheckCircle2, KeyRound } from "lucide-react";
import { useState } from "react";

export default function ResetPasswordPage() {
  const { getAllUsers } = useAuth();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const users = getAllUsers();
    const found = users.find((u) => u.email === email);
    if (found) {
      setSubmitted(true);
    } else {
      setError("Email tidak ditemukan dalam sistem kami.");
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
          <h1 className="text-2xl font-bold text-primary">Reset Kata Sandi</h1>
          <p className="text-muted-foreground mt-1">LSPBEA Indonesia</p>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-md p-8">
          {submitted ? (
            <div
              data-ocid="reset.success_state"
              className="text-center space-y-4"
            >
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
              <h2 className="text-lg font-semibold">Permintaan Terkirim!</h2>
              <p className="text-muted-foreground text-sm">
                Instruksi reset kata sandi telah dikirim ke{" "}
                <strong>{email}</strong>. Silakan periksa kotak masuk email
                Anda.
              </p>
              <a
                href="/login"
                data-ocid="reset.link"
                className="inline-block mt-4 text-primary hover:underline font-medium text-sm"
              >
                ← Kembali ke halaman masuk
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="text-sm text-muted-foreground">
                Masukkan alamat Gmail yang terdaftar untuk mereset kata sandi
                Anda.
              </p>
              <div className="space-y-2">
                <Label htmlFor="email">Gmail Terdaftar</Label>
                <Input
                  id="email"
                  data-ocid="reset.input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contoh@gmail.com"
                  required
                />
              </div>
              {error && (
                <p
                  data-ocid="reset.error_state"
                  className="text-destructive text-sm"
                >
                  {error}
                </p>
              )}
              <Button
                data-ocid="reset.submit_button"
                type="submit"
                className="w-full"
              >
                <KeyRound className="mr-2 h-4 w-4" />
                Kirim Instruksi Reset
              </Button>
              <p className="text-center text-sm">
                <a
                  href="/login"
                  data-ocid="reset.link"
                  className="text-primary hover:underline"
                >
                  ← Kembali ke halaman masuk
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
