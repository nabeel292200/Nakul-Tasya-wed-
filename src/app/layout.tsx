import type { Metadata, Viewport } from 'next';
import './globals.css';
import { weddingData } from '@/config/wedding';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#354234',
};

export const metadata: Metadata = {
  metadataBase: new URL(weddingData.meta.url),
  title: weddingData.meta.title,
  description: weddingData.meta.description,
  openGraph: {
    type: 'website',
    title: weddingData.meta.title,
    description: weddingData.meta.description,
    url: weddingData.meta.url,
    siteName: weddingData.meta.siteName,
    images: [
      {
        url: weddingData.meta.image,
        alt: weddingData.meta.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: weddingData.meta.title,
    description: weddingData.meta.description,
    images: [weddingData.meta.image],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: weddingData.event.title,
    startDate: weddingData.event.startsAt,
    endDate: weddingData.event.endsAt,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: weddingData.venue.name,
      address: weddingData.venue.address,
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
