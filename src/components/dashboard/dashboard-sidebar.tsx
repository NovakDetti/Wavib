"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Link2, BarChart3, CreditCard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { LogoutButton } from "../ui-elements/logout-button";

const navigation = [
  { name: "Áttekintés", href: "/dashboard", icon: LayoutDashboard },
  { name: "Csatorna-kapcsolás", href: "/dashboard/connect", icon: Link2 },
  { name: "Analitika", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Számlázás", href: "/dashboard/billing", icon: CreditCard },
  { name: "Beállítások", href: "/dashboard/settings/business", icon: Settings },
  { name: "Profil", href: "/dashboard/profile", icon: User },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    // /dashboard → exact; a többi: prefix
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname?.startsWith(href);
  };

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 border-r border-border/50 bg-card/30 backdrop-blur-sm">
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
        <div className="flex justify-start gap-2 mt-8">
            <LogoutButton />
        </div>
      </nav>
    </aside>
  );
}
