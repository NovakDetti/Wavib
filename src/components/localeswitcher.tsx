"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function LocaleSwitcher() {
  const pathname = usePathname();
  const currentLocale = pathname.startsWith("/en") ? "en" : "hu";

  return (
    <div className="flex gap-2 text-sm text-slate-400">
      <Link
        href={pathname.replace(/^\/(en|hu)/, "/hu")}
        className={currentLocale === "hu" ? "font-bold text-white" : ""}
      >HU</Link>
      <span>•</span>
      <Link
        href={pathname.replace(/^\/(en|hu)/, "/en")}
        className={currentLocale === "en" ? "font-bold text-white" : ""}
      >EN</Link>
    </div>
  );
}
