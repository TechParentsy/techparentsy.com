import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://techparentsy.com';
const siteTitle = 'TechParentsy';
const siteDescription =
  'Empowering parents with technology. Transparent tools and guardrails for families.';

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
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'TechParentsy podcast',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/og.png'],
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
      <body className="bg-tp-bg text-tp-ink antialiased">
        {children}
      </body>
    </html>
  );
}
