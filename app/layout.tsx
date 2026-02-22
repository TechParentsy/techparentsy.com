import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const siteUrl = 'https://techparentsy.com';
const siteTitle = 'TechParentsy | Empowering parents with technology';
const siteDescription =
  'Transparent tools and guardrails for families navigating the digital world.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: 'TechParentsy',
  alternates: {
    canonical: '/',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: '/brand/mark_logo.png',
    shortcut: '/brand/mark_logo.png',
    apple: '/brand/mark_logo.png',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'TechParentsy',
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: '/brand/mark_logo.png',
        width: 1200,
        height: 630,
        alt: 'TechParentsy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/brand/mark_logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'&&t!=='system'){t='system';}var r=t==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t;document.documentElement.classList.toggle('dark',r==='dark');}catch(e){}})();",
          }}
        />
      </head>
      <body className={`${inter.className} bg-tp-bg text-tp-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
