"use client";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-10 max-w-3xl text-sm leading-relaxed">
      <h1 className="text-3xl font-bold mb-4">Kapcsolat</h1>

      <ul className="space-y-2">
        <li><strong>Szolgáltató:</strong> Bujákné Novák Bernadett E.V.</li>
        <li><strong>Székhely:</strong> 1151 Budapest, Sződliget utca 11.</li>
        <li><strong>E-mail:</strong> <a href="mailto:novakbernadett94@gmail.com" className="text-primary hover:underline">novakbernadett94@gmail.com</a></li>
        <li><strong>Adószám:</strong> 59982944-1-42</li>
        <li><strong>EU VAT:</strong> HU59982944</li>
      </ul>
    </div>
  );
}
