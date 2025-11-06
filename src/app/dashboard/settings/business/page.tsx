"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { PageHeader } from "@/components/dashboard/page-header";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui-elements/card";
import { Button } from "@/components/ui-elements/button";
import { Input } from "@/components/ui-elements/input";
import { Label } from "@/components/ui-elements/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui-elements/select";

import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { getBusinessSettings } from "@/components/dashboard/business-settings";

const businessSchema = z.object({
  companyName: z.string().min(2, "A cégnév legalább 2 karakter hosszú legyen"),
  brandDisplayName: z
    .string()
    .min(2, "A márkanév legalább 2 karakter hosszú legyen"),
  contactEmail: z.string().email("Érvénytelen e-mail cím"),
  timezone: z.string(),
  defaultLanguage: z.string(),
});

type BusinessFormData = z.infer<typeof businessSchema>;

export default function SettingsBusinessPage() {
  const settings = getBusinessSettings();
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      companyName: settings.companyName,
      brandDisplayName: settings.brandDisplayName,
      contactEmail: settings.contactEmail,
      timezone: settings.timezone,
      defaultLanguage: settings.defaultLanguage,
    },
  });

  const onSubmit = async (data: BusinessFormData) => {
    setSaving(true);

    // API hívás szimuláció
    await new Promise((r) => setTimeout(r, 1000));

    toast({
      title: "Beállítások mentve",
      description: "A változások sikeresen elmentve.",
    });

    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-4xl">
        <PageHeader
          title="Üzleti beállítások"
          subtitle="Kezeld a vállalkozásod alapadatait."
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Alapadatok</CardTitle>
              <CardDescription>
                Ezek az adatok jelennek meg a rendszerben és az ügyfeleidnek.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Cégnév *</Label>
                <Input
                  id="companyName"
                  placeholder="Acme Corporation"
                  {...register("companyName")}
                />
                {errors.companyName && (
                  <p className="text-sm text-destructive">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="brandDisplayName">Márkanév *</Label>
                <Input
                  id="brandDisplayName"
                  placeholder="Acme"
                  {...register("brandDisplayName")}
                />
                {errors.brandDisplayName && (
                  <p className="text-sm text-destructive">
                    {errors.brandDisplayName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Kapcsolattartói e-mail *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="contact@acme.com"
                  {...register("contactEmail")}
                />
                {errors.contactEmail && (
                  <p className="text-sm text-destructive">
                    {errors.contactEmail.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Időzóna</Label>
                  <Select
                    value={watch("timezone")}
                    onValueChange={(val) => setValue("timezone", val)}
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/Budapest">
                        Budapest (CET)
                      </SelectItem>
                      <SelectItem value="Europe/London">London (GMT)</SelectItem>
                      <SelectItem value="America/New_York">
                        New York (EST)
                      </SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">Alapértelmezett nyelv</Label>
                  <Select
                    value={watch("defaultLanguage")}
                    onValueChange={(val) => setValue("defaultLanguage", val)}
                  >
                    <SelectTrigger id="defaultLanguage">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hu">Magyar</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>WhatsApp Business</CardTitle>
              <CardDescription>
                Csatlakoztatott fiók állapota és adatai.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Állapot</Label>
                  <p className="text-sm text-muted-foreground">
                    Jelenlegi kapcsolat státusza
                  </p>
                </div>
                <StatusBadge
                  variant={
                    settings.whatsappBusiness.status === "connected"
                      ? "success"
                      : "neutral"
                  }
                >
                  {settings.whatsappBusiness.status === "connected"
                    ? "Csatlakoztatva"
                    : "Nincs csatlakoztatva"}
                </StatusBadge>
              </div>

              {settings.whatsappBusiness.status === "connected" && (
                <>
                  <div>
                    <Label>Csatorna azonosító</Label>
                    <p className="font-mono text-sm text-muted-foreground">
                      {settings.whatsappBusiness.channelId || "N/A"}
                    </p>
                  </div>

                  <div>
                    <Label>Csatlakozva</Label>
                    <p className="text-sm text-muted-foreground">
                      {settings.whatsappBusiness.connectedAt
                        ? new Date(
                            settings.whatsappBusiness.connectedAt,
                          ).toLocaleString("hu-HU")
                        : "N/A"}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Mentés
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
