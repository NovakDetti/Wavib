"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui-elements/button";
import { Input } from "@/components/ui-elements/input";
import { Label } from "@/components/ui-elements/label";
import { Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";

export default function LoginPageClient() {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setSocialLoading] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSocialLogin = async (provider: string) => {
    setSocialLoading(provider);
    // egyelőre csak placeholder
    setTimeout(() => {
      setSocialLoading(null);
      toast({
        title: "Hamarosan elérhető",
        description: `${provider} bejelentkezés fejlesztés alatt.`,
      });
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { email: "", password: "" };

    if (!formData.email) newErrors.email = "Az e-mail cím kötelező";
    else if (!validateEmail(formData.email))
      newErrors.email = "Érvénytelen e-mail formátum";

    if (!formData.password) newErrors.password = "A jelszó kötelező";

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Sikeres bejelentkezés!",
        description: "Irány a kezelőfelület...",
      });
      router.push("/");
    }, 1500);
  };

}
