import { ThemeProvider } from '@/components/theme'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import {GeistSans, GeistMono} from "geist/font/nextjs';
import './globals.css'

export const metadata: Metadata = {
  title: 'eDziennik',
  description: 'An open-source electronic gradebook for schools.',
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
