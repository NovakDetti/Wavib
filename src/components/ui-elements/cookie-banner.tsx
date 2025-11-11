"use client";

import { useTranslations } from "next-intl";
import CookieConsent from "react-cookie-consent";
import Link from "next/link";

export function CookieBanner() {
  const t = useTranslations(); // automatikusan az aktuális nyelvet tölti be

  return (
    <CookieConsent
      location="bottom"
      cookieName="wavib-consent"
      buttonText={t("cookie.accept")}
      declineButtonText={t("cookie.decline")}
      enableDeclineButton
      expires={180}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(24, 24, 27, 0.92)",
        backdropFilter: "blur(18px)",
        borderTop: "1px solid rgba(82, 82, 91, 0.6)",
        padding: "12px 20px",
        zIndex: 60,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "72px",
      }}
      buttonWrapperClasses="flex items-center gap-2 mt-3 sm:mt-0"
      buttonStyle={{
        background: "linear-gradient(135deg,#22c55e,#4ade80)",
        color: "#020617",
        fontWeight: 700,
        borderRadius: 9999,
        padding: "8px 20px",
        border: "none",
      }}
      declineButtonStyle={{
        background: "transparent",
        color: "#e5e7eb",
        borderRadius: 9999,
        padding: "8px 20px",
        border: "1px solid rgba(148, 163, 184, 0.7)",
      }}
    >
      <div className="w-full max-w-6xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm text-slate-100">
        <div className="space-y-1 max-w-3xl">
          <p className="text-[11px] tracking-[0.18em] uppercase text-slate-400 font-semibold">
            {t("cookie.title")}
          </p>
          <p className="leading-snug">
            {t("cookie.text")}{" "}
            <Link
              href="/cookies"
              className="text-emerald-400 underline underline-offset-2 decoration-emerald-400/70"
            >
              {t("cookie.link")}
            </Link>
            .
          </p>
        </div>
      </div>
    </CookieConsent>
  );
}
