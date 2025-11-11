"use client";

export const Footer = () => {
  return (
  <footer className="border-t border-border/40 py-6 text-center text-xs text-muted-foreground">
      <div className="flex justify-center gap-4">
        <a href="/privacy" className="hover:underline">Adatvédelem</a>
        <a href="/terms" className="hover:underline">Felhasználási feltételek</a>
        <a href="/cookies" className="hover:underline">Cookie szabályzat</a>
        <a href="/contact" className="hover:underline">Kapcsolat</a>
      </div>
      <p className="mt-2">
        © {new Date().getFullYear()} Wavib · Bujákné Novák Bernadett E.V.
      </p>
  </footer>
  );
};
