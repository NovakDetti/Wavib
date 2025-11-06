"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui-elements/button";
import { Input } from "@/components/ui-elements/input";
import { Label } from "@/components/ui-elements/label";
import { Checkbox } from "@/components/ui-elements/checkbox";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { registerUser } from "@/app/actions/signup.actions";


export default function SignUpFormClient() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", terms: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [strength, setStrength] = useState<"weak" | "ok" | "strong" | null>(null);

  const onChange = (k: keyof typeof form, v: string | boolean) => {
    setForm(prev => ({ ...prev, [k]: v } as any));
    setErrors(prev => ({ ...prev, [k as string]: "" }));
    if (k === "password" && typeof v === "string") {
      const hasLower = /[a-z]/.test(v);
      const hasUpper = /[A-Z]/.test(v);
      const hasNum   = /[0-9]/.test(v);
      const hasSpec  = /[!@#$%^&*(),.?":{}|<>]/.test(v);
      const score = [hasLower, hasUpper, hasNum, hasSpec].filter(Boolean).length;
      setStrength(v.length >= 12 && score >= 3 ? "strong" : v.length >= 8 && score >= 2 ? "ok" : "weak");
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "A név megadása kötelező";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Érvénytelen e-mail cím";
    if ((form.password ?? "").length < 8) next.password = "Legalább 8 karakter";
    if (!form.terms) next.terms = "Fogadd el a feltételeket";
    if (Object.keys(next).length) return setErrors(next);

    setIsLoading(true);
    try {
      const res = await registerUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      if (!res?.ok) throw new Error(res?.message || "Sikertelen regisztráció");
      toast({ title: "Sikeres regisztráció!", description: "Irány a kezelőfelület…" });
      // opcionális: automatikus bejelentkezés
      // await signIn("credentials", { email: form.email, password: form.password, callbackUrl: "/dashboard" });
    } catch (err: any) {
      setErrors(prev => ({ ...prev, email: err?.message || "Hiba történt" }));
    } finally {
      setIsLoading(false);
    }
  };

  const strengthColor =
    !strength ? "bg-muted"
      : strength === "strong" ? "bg-[hsl(var(--primary))]"
      : strength === "ok" ? "bg-yellow-500"
      : "bg-[hsl(var(--destructive))]";

  return (
    <>
      {/* Social login – kliens oldali next-auth */}
      <div className="space-y-3">
        <Button
          type="button"
          variant="google"
          size="lg"
          className="w-full"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.35 11.1h-9.17v2.96h5.36c-.23 1.25-.9 2.3-1.91 3.02v2.5h3.07c1.8-1.66 2.85-4.1 2.85-7 0-.62-.06-1.23-.2-1.82z"/>
            <path d="M12.18 22c2.52 0 4.63-.83 6.17-2.27l-3.07-2.5c-.84.56-1.9.88-3.1.88-2.37 0-4.38-1.6-5.1-3.77H3.84v2.65A9.97 9.97 0 0 0 12.18 22z"/>
            <path d="M7.08 14.34a5.99 5.99 0 0 1 0-4.68V7H3.84A9.96 9.96 0 0 0 2.2 12c0 1.57.37 3.05 1.03 4.35l3.85-2.01z"/>
            <path d="M12.18 4.79c1.38 0 2.62.47 3.59 1.4l2.68-2.68A9.99 9.99 0 0 0 12.18 2a9.97 9.97 0 0 0-8.34 4.65l3.85 2.01c.72-2.17 2.73-3.87 5.1-3.87z"/>
          </svg>
          Folytatás Google-lel
        </Button>
        <Button
          type="button"
          size="lg"
          className="w-full h-12 bg-[hsl(var(--foreground))] text-[hsl(var(--background))] hover:bg-[hsl(var(--foreground))]/90 rounded-[calc(var(--radius)+4px)] font-medium"
          onClick={() => signIn("apple", { callbackUrl: "/" })}
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
          Folytatás Apple-lel
        </Button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-[hsl(var(--border))]" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 text-xs tracking-wider text-[hsl(var(--muted-foreground))] bg-[hsl(var(--card))]">
            VAGY E-MAILLEL
          </span>
        </div>
      </div>

      {/* Email form */}
      <form onSubmit={submit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Név</Label>
          <Input
            id="name"
            placeholder="Teljes neved"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
            className={errors.name ? "border-[hsl(var(--destructive))]" : ""}
          />
          {errors.name && (
            <p className="text-xs text-[hsl(var(--destructive))] flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="te@pelda.hu"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={errors.email ? "border-[hsl(var(--destructive))]" : ""}
          />
          {errors.email && (
            <p className="text-xs text-[hsl(var(--destructive))] flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Jelszó</Label>
          <Input
            id="password"
            type="password"
            placeholder="Legalább 8 karakter"
            value={form.password}
            onChange={(e) => onChange("password", e.target.value)}
            className={errors.password ? "border-[hsl(var(--destructive))]" : ""}
          />
          {form.password && (
            <div className="space-y-1">
              <div className="h-1 w-full rounded-full bg-[hsl(var(--muted))] overflow-hidden">
                <div
                  className={`h-full ${strengthColor} transition-all`}
                  style={{
                    width: strength === "strong" ? "100%" : strength === "ok" ? "66%" : "33%",
                  }}
                />
              </div>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                Jelszó erőssége:{" "}
                <span
                  className={
                    strength === "strong"
                      ? "text-[hsl(var(--primary))]"
                      : strength === "ok"
                      ? "text-yellow-500"
                      : "text-[hsl(var(--destructive))]"
                  }
                >
                  {strength === "strong" ? "Erős" : strength === "ok" ? "Megfelelő" : "Gyenge"}
                </span>
              </p>
            </div>
          )}
          {errors.password && (
            <p className="text-xs text-[hsl(var(--destructive))] flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.password}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              checked={form.terms}
              onCheckedChange={(c) => onChange("terms", Boolean(c))}
            />
            <Label htmlFor="terms" className="text-sm leading-tight">
              Elfogadom a{" "}
              <Link href="/terms" className="text-[hsl(var(--primary))] hover:underline">
                Felhasználási feltételeket
              </Link>{" "}
              és az{" "}
              <Link href="/privacy" className="text-[hsl(var(--primary))] hover:underline">
                Adatkezelési tájékoztatót
              </Link>
              .
            </Label>
          </div>
          {errors.terms && (
            <p className="text-xs text-[hsl(var(--destructive))] flex items-center gap-1 pl-6">
              <AlertCircle className="w-3 h-3" /> {errors.terms}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 rounded-[calc(var(--radius)+6px)] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))/0.9] font-semibold glow-green"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Regisztráció…
            </>
          ) : (
            <>
              <Check className="w-4 h-4 mr-2" />
              Fiók létrehozása
            </>
          )}
        </Button>
      </form>

      <div className="text-center space-y-3 pt-2">
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Már van fiókod?{" "}
          <Link href="/login" className="font-medium text-[hsl(var(--secondary))] hover:underline">
            Bejelentkezés
          </Link>
        </p>
        <div className="flex items-center justify-center gap-4 text-xs text-[hsl(var(--muted-foreground))]">
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-[hsl(var(--primary))]" />
            30 másodperc alatt kész vagy
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-[hsl(var(--primary))]" />
            Bármikor lemondható
          </span>
        </div>
      </div>
    </>
  );
}
