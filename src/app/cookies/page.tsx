"use client";

export default function CookiesPage() {
  return (
    <div className="container mx-auto py-10 max-w-3xl text-sm leading-relaxed">
      <h1 className="text-3xl font-bold mb-4">Cookie szabályzat</h1>

      <p>
        A <strong>wavib.app</strong> sütiket és hasonló technológiákat használ
        (localStorage, sessionStorage), hogy a szolgáltatás megfelelően
        működjön, és hogy mérni tudjuk az oldal teljesítményét.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Sütik típusai</h2>
      <ul className="list-disc ml-6 space-y-1">
        <li><strong>Alapvető sütik:</strong> bejelentkezés, biztonság, navigáció</li>
        <li><strong>Preferencia sütik:</strong> nyelv, téma beállítások</li>
        <li><strong>Analitikai sütik:</strong> forgalom- és hibamérés (anonim módon)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Hozzájárulás kezelése</h2>
      <p>
        Az opcionális sütikhez hozzájárulás szükséges, amelyet a felugró sávban
        adhat meg a látogató. A hozzájárulás bármikor visszavonható.
      </p>
    </div>
  );
}
