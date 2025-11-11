"use client";

export default function TermsPage() {
  return (
    <div className="container mx-auto py-10 max-w-3xl text-sm leading-relaxed">
      <h1 className="text-3xl font-bold mb-4">Felhasználási feltételek</h1>
      <p>Utolsó frissítés: {new Date().toLocaleDateString("hu-HU")}</p>

      <p className="mt-4">
        A <strong>https://wavib.app</strong> weboldal és a Wavib platform
        használatával elfogadod a jelen felhasználási feltételeket.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Szolgáltató adatai</h2>
      <ul className="space-y-1">
        <li><strong>Név:</strong> Bujákné Novák Bernadett E.V.</li>
        <li><strong>Székhely:</strong> 1151 Budapest, Sződliget utca 11.</li>
        <li><strong>Adószám:</strong> 59982944-1-42</li>
        <li><strong>E-mail:</strong> novakbernadett94@gmail.com</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Szolgáltatás leírása</h2>
      <p>
        A Wavib egy SaaS (Software as a Service) alkalmazás, amely lehetővé teszi
        vállalkozások számára, hogy a Business WhatsApp vagy Viber fiókjukat
        összekössék egy mesterséges intelligenciával működő rendszerrel, amely
        automatikusan kezeli az ügyfélkommunikációt és időpontfoglalásokat.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Fiók és bejelentkezés</h2>
      <ul className="list-disc ml-6 space-y-1">
        <li>A bejelentkezés Google-fiókkal történik (OAuth 2.0).</li>
        <li>Köteles vagy biztonságban tartani a hozzáférési adataidat.</li>
        <li>Jogosulatlan hozzáférés esetén azonnal értesíts minket.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Felelősség</h2>
      <p>
        A felhasználó kizárólagos felelősséggel tartozik az általa bevitt vagy a
        rendszer által kezelt ügyféladatok jogszerűségéért. A Wavib semmilyen
        körülmények között nem használja az ügyféladatokat marketingcélokra.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Tilos tevékenységek</h2>
      <ul className="list-disc ml-6 space-y-1">
        <li>Spam, kéretlen üzenetek küldése</li>
        <li>Jogellenes, sértő vagy félrevezető kommunikáció</li>
        <li>A platform bármilyen formájú visszaélésszerű használata</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Díjazás</h2>
      <p>
        A Wavib egyes szolgáltatásai előfizetéshez kötöttek. Az árakat és a
        feltételeket külön „Pricing” oldalon tüntetjük fel. A számlázás
        elektronikus úton történik.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Jogviták</h2>
      <p>
        A jelen feltételekre a magyar jog az irányadó. Jogvita esetén a
        Szolgáltató székhelye szerinti bíróság az illetékes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Kapcsolat</h2>
      <p>
        Kérdés esetén:{" "}
        <a href="mailto:novakbernadett94@gmail.com" className="text-primary hover:underline">
          novakbernadett94@gmail.com
        </a>
      </p>
    </div>
  );
}
