import AuthProvider from '@/components/providers/session-provider'
import '../index.css'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'React App',
  description: 'Web site created with Next.js.',
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}