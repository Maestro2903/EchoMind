import './globals.css'
import { Inter } from 'next/font/google'
import ClientLayout from '@/components/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EchoMind - AI Assistant',
  description: 'EchoMind - Personalized AI Assistant for various contexts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
} 