"use client";

export default function TermsPage() {
  return (
    <div className="container mx-auto py-10 max-w-3xl text-sm leading-relaxed">
      <h1 className="text-3xl font-bold mb-4">Általános Szerződési Feltételek</h1>
      <p className="mb-4">
        Utolsó frissítés: {new Date().toLocaleDateString("hu-HU")}
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Szolgáltató adatai</h2>
      <ul className="space-y-1">
        <li><strong>Név:</strong> Bujákné Novák Bernadett E.V.</li>
        <li><strong>Székhely:</strong> 1151 Budapest, Sződliget utca 11.</li>
        <li><strong>Adószám:</strong> 59982944-1-42</li>
        <li><strong>E-mail:</strong>{" "}
          <a href="mailto:novakbernadett94@gmail.com" className="text-primary hover:underline">
            novakbernadett94@gmail.com
          </a>
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. A szolgáltatás leírása</h2>
      <p>
        A Wavib egy felhőalapú SaaS megoldás, amely WhatsApp és Viber
        csatornákon keresztül automatizálja a vállalkozások ügyfélkommunikációját
        és az időpontfoglalást mesterséges intelligencia segítségével.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. A szerződés létrejötte</h2>
      <p>
        A szerződés a weboldalon történő regisztrációval, illetve a Google-fiókkal
        történő bejelentkezéssel jön létre a Felhasználó és a Szolgáltató között,
        határozatlan időre.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Felhasználói fiók és felelősség</h2>
      <ul className="list-disc ml-6 space-y-1">
        <li>A Felhasználó köteles a hozzáférési adatait bizalmasan kezelni.</li>
        <li>A fiókból indított műveletekért a Felhasználó felel.</li>
        <li>
          A Szolgáltatás nem használható jogellenes, kéretlen vagy spam
          üzenetek küldésére.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Díjazás</h2>
      <p>
        A szolgáltatás jelenleg teszt jelleggel ingyenes. A Szolgáltató fenntartja
        a jogot, hogy a jövőben díjakat vezessen be, melyről a Felhasználókat
        előzetesen, e-mailben és a weboldalon keresztül tájékoztatja.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Felelősségkorlátozás</h2>
      <ul className="list-disc ml-6 space-y-1">
        <li>
          Az AI által generált válaszok javaslatnak minősülnek, pontosságukért
          és teljességükért a Szolgáltató nem vállal felelősséget.
        </li>
        <li>
          A Szolgáltató nem felel harmadik fél rendszereinek (WhatsApp, Viber,
          OpenAI, n8n, tárhelyszolgáltató) hibájából eredő szolgáltatás-kimaradásokért.
        </li>
        <li>
          Közvetett károkért (elmaradt haszon, adatvesztés) a Szolgáltató nem
          felel, kivéve, ha azt szándékosan okozta.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Felmondás és fióktörlés</h2>
      <p>
        A Felhasználó bármikor kérheti fiókja törlését az{" "}
        <a href="mailto:novakbernadett94@gmail.com" className="text-primary hover:underline">
          novakbernadett94@gmail.com
        </a>{" "}
        címen. A törlésre vonatkozó adatkezelési szabályokat az Adatvédelmi
        tájékoztató tartalmazza.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Irányadó jog</h2>
      <p>
        Jelen szerződésre a magyar jog az irányadó. Jogvita esetén a felek
        elsősorban békés úton próbálnak megegyezni; ennek sikertelensége esetén
        a hatáskörrel és illetékességgel rendelkező magyar bíróság jár el.
      </p>
    </div>
  );
}
