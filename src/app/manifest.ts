// app/manifest.ts
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'S3NK — Quadruped Rescue Robot',
    short_name: 'S3NK',
    description: 'Inspection & rescue assist quadruped robot — deploy anywhere.',
    id: '/',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#050510',
    theme_color: '#050510',
    orientation: 'portrait',
    dir: 'ltr',
    lang: 'en',
    categories: ['technology', 'robotics'],
    prefer_related_applications: false,
    related_applications: [],
    launch_handler: { client_mode: 'focus-existing' },
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-256.png', sizes: '256x256', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-384.png', sizes: '384x384', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-192-maskable.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
