"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui-elements/button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <Button
      variant="outline"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center gap-2"
    >
      <LogOut className="h-4 w-4" />
      Kijelentkezés
    </Button>
  );
}
