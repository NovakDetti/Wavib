import AuthProvider from '@/components/providers/session-provider'
import '../index.css'
 
export const metadata = {
  title: "Wavib – AI ügyfélkommunikáció WhatsAppon és Viberen",
  description:
    "Automatizáld az üzenetkezelést és az időpontfoglalást AI segítségével WhatsApp és Viber csatornákon.",
  openGraph: {
    title: "Wavib – AI ügyfélkommunikáció",
    description:
      "AI-alapú asszisztens, ami kezeli az ügyfélüzeneteket és időpontokat WhatsAppon és Viberen.",
    url: "https://wavib.com",
    siteName: "Wavib",
    locale: "hu_HU",
    type: "website",
  },
};

 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

