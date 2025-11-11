"use client";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-10 max-w-3xl text-sm leading-relaxed">
      <h1 className="text-3xl font-bold mb-4">Adatvédelmi szabályzat</h1>

      <p className="mb-4">
        Utolsó frissítés: {new Date().toLocaleDateString("hu-HU")}
      </p>

      <p className="mb-4">
        Ez az adatvédelmi tájékoztató bemutatja, hogyan kezeli a{" "}
        <strong>Wavib</strong> (a továbbiakban: „Szolgáltató”, „mi”)
        a felhasználók személyes adatait a{" "}
        <strong>https://wavib.app</strong> weboldalon és kapcsolódó
        szolgáltatásaiban.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Adatkezelő adatai</h2>
      <ul className="space-y-1">
        <li><strong>Név:</strong> Bujákné Novák Bernadett egyéni vállalkozó</li>
        <li><strong>Székhely:</strong> Magyarország, 1151 Budapest, Sződliget utca 11.</li>
        <li><strong>Adószám:</strong> 59982944-1-42</li>
        <li><strong>EU VAT:</strong> HU59982944</li>
        <li><strong>E-mail:</strong> <a href="mailto:novakbernadett94@gmail.com" className="text-primary hover:underline">novakbernadett94@gmail.com</a></li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Az adatkezelés célja</h2>
      <p>
        A Wavib célja, hogy a felhasználók a Business WhatsApp és Viber fiókjukat
        összekapcsolhassák egy mesterséges intelligenciával támogatott
        kommunikációs rendszerrel. Az OpenAI technológiáját használjuk arra, hogy
        a megadott előzmények és ügyféladatok alapján automatikusan kezeljük az
        ügyfélkommunikációt és az időpontfoglalásokat.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Kezelt adatok köre</h2>
      <ul className="list-disc ml-6 space-y-1">
        <li>Név, e-mail cím, profilkép (Google-bejelentkezéskor)</li>
        <li>Ügyfeleid neve, telefonszáma, üzenet tartalma (WhatsApp / Viber API-n keresztül)</li>
        <li>Időpontfoglalási adatok (idő, szolgáltatás, státusz)</li>
        <li>Technikai adatok: IP-cím, böngészőtípus, látogatási napló</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Az adatkezelés jogalapja</h2>
      <p>
        Az adatkezelés a GDPR 6. cikk (1) bekezdés b) és f) pontja alapján történik:
      </p>
      <ul className="list-disc ml-6 space-y-1">
        <li><strong>Szerződés teljesítése</strong> – a Wavib szolgáltatás nyújtása érdekében.</li>
        <li><strong>Jogos érdek</strong> – a platform biztonságos és személyre szabott működtetéséhez.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Adatfeldolgozók és adattovábbítás</h2>
      <p>Az alábbi adatfeldolgozókat vesszük igénybe:</p>
      <ul className="list-disc ml-6 space-y-1">
        <li><strong>Vercel Inc.</strong> – webhosting szolgáltatás</li>
        <li><strong>Neon / PostgreSQL</strong> – adatbázis</li>
        <li><strong>n8n.cloud</strong> – automatizációs és workflow rendszer</li>
        <li><strong>Meta Platforms Ireland Ltd.</strong> – WhatsApp Business Platform</li>
        <li><strong>OpenAI, L.L.C.</strong> – szövegfeldolgozási és mesterséges intelligencia API</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Adatmegőrzés</h2>
      <ul className="list-disc ml-6 space-y-1">
        <li>Felhasználói fiókadatok: a fiók törléséig</li>
        <li>Üzenetnaplók: legfeljebb 90 napig</li>
        <li>Számlázási adatok: 8 évig (törvényi kötelezettség)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Az érintettek jogai</h2>
      <ul className="list-disc ml-6 space-y-1">
        <li>hozzáférés és másolat kérése</li>
        <li>helyesbítés és törlés kérése</li>
        <li>az adatkezelés korlátozása</li>
        <li>adathordozhatóság</li>
        <li>tiltakozás bizonyos adatkezelések ellen</li>
      </ul>

      <p className="mt-2">
        A kérelmeket az alábbi címen fogadjuk:{" "}
        <a href="mailto:novakbernadett94@gmail.com" className="text-primary hover:underline">
          novakbernadett94@gmail.com
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Panaszjog</h2>
      <p>
        Panasz esetén fordulhatsz a{" "}
        <strong>Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH)</strong>:
      </p>
      <ul className="ml-6 list-disc space-y-1">
        <li>Cím: 1055 Budapest, Falk Miksa utca 9–11.</li>
        <li>Web: <a href="https://naih.hu" className="text-primary hover:underline">https://naih.hu</a></li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Módosítás</h2>
      <p>
        Az adatkezelési tájékoztatót időről időre frissíthetjük. A módosításokat a
        weboldalon közzétesszük, jelentős változás esetén e-mailben is értesítünk.
      </p>
    </div>
  );
}
