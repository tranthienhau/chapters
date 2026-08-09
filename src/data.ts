// Mockup data for the Chapters photobook app - trips, themes, alerts.
import { PhotoKey } from './photos';

export type BookStatus = 'draft' | 'ordered' | 'shipped';

export interface Trip {
  id: string;
  name: string;
  place: string;
  dateRange: string;
  cover: PhotoKey;
  photoCount: number;
  selectedCount: number;
  pages: number;
  status: BookStatus;
  theme: string;
  isNew?: boolean;
  photos: TripPhoto[];
}

export interface TripPhoto {
  key: PhotoKey;
  aiPick: boolean;
  tag: 'Scenery' | 'People' | 'Food';
}

export const themes = [
  {
    id: 'editorial',
    name: 'Editorial',
    blurb: 'Full-bleed spreads, generous white space. Best for wide scenery.',
    recommended: true,
  },
  {
    id: 'iconic',
    name: 'Iconic',
    blurb: 'Bold grids and captions. Great for city trips and landmarks.',
    recommended: false,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    blurb: 'One photo per page, quiet type. Lets each shot breathe.',
    recommended: false,
  },
  {
    id: 'classic',
    name: 'Classic',
    blurb: 'Warm album grid with soft borders. A timeless keepsake.',
    recommended: false,
  },
];

const p = (key: PhotoKey, aiPick: boolean, tag: TripPhoto['tag']): TripPhoto => ({ key, aiPick, tag });

export const trips: Trip[] = [
  {
    id: 'italy',
    name: 'Italy, Spring 2026',
    place: 'Rome, Florence, Amalfi',
    dateRange: 'May 12 - 24',
    cover: 'amalfi',
    photoCount: 214,
    selectedCount: 42,
    pages: 28,
    status: 'draft',
    theme: 'Editorial',
    isNew: true,
    photos: [
      p('amalfi', true, 'Scenery'), p('positano', true, 'Scenery'), p('rome', true, 'People'),
      p('florence', true, 'Scenery'), p('venice', true, 'Scenery'), p('tuscany', true, 'Scenery'),
      p('paris', false, 'People'), p('london', false, 'Food'), p('santorini', true, 'Scenery'),
    ],
  },
  {
    id: 'japan',
    name: 'Japan Wanderlust',
    place: 'Kyoto, Tokyo, Osaka',
    dateRange: 'Mar 3 - 15',
    cover: 'kyoto',
    photoCount: 318,
    selectedCount: 36,
    pages: 32,
    status: 'ordered',
    theme: 'Iconic',
    photos: [
      p('kyoto', true, 'Scenery'), p('tokyo', true, 'People'), p('osaka', true, 'Food'),
      p('tuscany', false, 'Scenery'), p('venice', false, 'Scenery'),
    ],
  },
  {
    id: 'swiss',
    name: 'Swiss Alps',
    place: 'Zermatt, Lucerne',
    dateRange: 'Jan 8 - 14',
    cover: 'zermatt',
    photoCount: 176,
    selectedCount: 30,
    pages: 24,
    status: 'draft',
    theme: 'Minimal',
    photos: [
      p('zermatt', true, 'Scenery'), p('lucerne', true, 'Scenery'), p('alps', true, 'Scenery'),
      p('paris', false, 'People'),
    ],
  },
];

export interface Alert {
  id: string;
  kind: 'welcome' | 'left' | 'shipped' | 'theme' | 'backup';
  title: string;
  body: string;
  time: string;
  tripId?: string;
  highlight?: boolean;
}

export const alerts: Alert[] = [
  {
    id: 'a1',
    kind: 'welcome',
    title: 'Welcome home from Italy',
    body: 'We picked your 42 best shots and laid out a draft book. Review it now?',
    time: '2h ago',
    tripId: 'italy',
    highlight: true,
  },
  { id: 'a2', kind: 'left', title: 'You just left Barcelona', body: 'Want a book from this trip? Tap to start.', time: '2d ago' },
  { id: 'a3', kind: 'shipped', title: 'Your Portugal book shipped', body: 'Arriving Fri, Aug 21. Track your delivery.', time: '4d ago' },
  { id: 'a4', kind: 'theme', title: 'New Editorial theme', body: 'A refreshed layout for landscape trips is available.', time: '6d ago' },
  { id: 'a5', kind: 'backup', title: "Backup of 'Kyoto Spring' complete", body: 'Your book is safely stored in the cloud.', time: '1w ago' },
];

export const user = {
  name: 'Emma Carter',
  email: 'emma.carter@gmail.com',
  stats: { trips: 12, books: 5, photos: '3.4k' },
};
