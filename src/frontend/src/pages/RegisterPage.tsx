import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useState } from "react";

function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { score, label: "Lemah", color: "bg-destructive" };
  if (score <= 3) return { score, label: "Sedang", color: "bg-yellow-500" };
  return { score, label: "Kuat", color: "bg-green-500" };
}

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  const strength = getPasswordStrength(form.password);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.username) newErrors.username = "Nama akun wajib diisi.";
    if (!form.firstName) newErrors.firstName = "Nama depan wajib diisi.";
    if (!form.lastName) newErrors.lastName = "Nama belakang wajib diisi.";
    if (!form.email.endsWith("@gmail.com"))
      newErrors.email = "Email harus menggunakan @gmail.com.";
    if (form.password.length < 8)
      newErrors.password = "Kata sandi minimal 8 karakter.";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Kata sandi tidak cocok.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;
    const result = register({
      username: form.username,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    });
    if (result.success) {
      navigate({ to: "/login" });
    } else {
      setSubmitError(result.message);
    }
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <img
            src="/assets/generated/lspbea-building-logo-transparent.dim_200x200.png"
            alt="LSPBEA Indonesia"
            className="h-16 w-16 object-contain mx-auto mb-3"
          />
          <h1 className="text-2xl font-bold text-primary">Daftar Akun Baru</h1>
          <p className="text-muted-foreground mt-1">LSPBEA Indonesia</p>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="firstName">Nama Depan</Label>
                <Input
                  id="firstName"
                  data-ocid="register.input"
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  placeholder="Nama depan"
                />
                {errors.firstName && (
                  <p
                    data-ocid="register.error_state"
                    className="text-destructive text-xs"
                  >
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lastName">Nama Belakang</Label>
                <Input
                  id="lastName"
                  data-ocid="register.input"
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  placeholder="Nama belakang"
                />
                {errors.lastName && (
                  <p
                    data-ocid="register.error_state"
                    className="text-destructive text-xs"
                  >
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="username">Nama Akun</Label>
              <Input
                id="username"
                data-ocid="register.input"
                value={form.username}
                onChange={(e) => update("username", e.target.value)}
                placeholder="Buat nama akun unik"
              />
              {errors.username && (
                <p
                  data-ocid="register.error_state"
                  className="text-destructive text-xs"
                >
                  {errors.username}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Gmail</Label>
              <Input
                id="email"
                data-ocid="register.input"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="contoh@gmail.com"
              />
              {errors.email && (
                <p
                  data-ocid="register.error_state"
                  className="text-destructive text-xs"
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Kata Sandi</Label>
              <div className="relative">
                <Input
                  id="password"
                  data-ocid="register.input"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="Minimal 8 karakter"
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
              {form.password && (
                <div className="space-y-1">
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          i <= strength.score ? strength.color : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Kekuatan: {strength.label}
                  </p>
                </div>
              )}
              {errors.password && (
                <p
                  data-ocid="register.error_state"
                  className="text-destructive text-xs"
                >
                  {errors.password}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  data-ocid="register.input"
                  type={showConfirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  placeholder="Ulangi kata sandi"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p
                  data-ocid="register.error_state"
                  className="text-destructive text-xs"
                >
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {submitError && (
              <p
                data-ocid="register.error_state"
                className="text-destructive text-sm"
              >
                {submitError}
              </p>
            )}

            <Button
              data-ocid="register.submit_button"
              type="submit"
              className="w-full mt-2"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Daftar
            </Button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-6">
            Sudah punya akun?{" "}
            <a
              href="/login"
              data-ocid="register.link"
              className="text-primary hover:underline font-medium"
            >
              Masuk di sini
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
