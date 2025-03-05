import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Whastapp message encryptor',
  description: 'Created with Devsharif',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
