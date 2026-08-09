// Zustand store - permissions, per-trip curation + theme + page count, orders.
import { create } from 'zustand';
import { trips as seedTrips, Trip } from './data';

interface Grants {
  photos: boolean;
  location: boolean;
}

interface Draft {
  theme: string;
  pages: number;
  extraPages: boolean;
  excluded: Record<string, boolean>; // photo key -> excluded
  title: string;
}

interface State {
  grants: Grants;
  setGrant: (k: keyof Grants, v: boolean) => void;
  drafts: Record<string, Draft>;
  orders: string[];
  ensureDraft: (t: Trip) => void;
  setTheme: (tripId: string, theme: string) => void;
  setPages: (tripId: string, pages: number) => void;
  toggleExtraPages: (tripId: string) => void;
  togglePhoto: (tripId: string, key: string) => void;
  setTitle: (tripId: string, title: string) => void;
  placeOrder: (tripId: string) => void;
}

export const useStore = create<State>((set, get) => ({
  grants: { photos: false, location: false },
  setGrant: (k, v) => set((s) => ({ grants: { ...s.grants, [k]: v } })),
  drafts: {},
  orders: [],
  ensureDraft: (t) =>
    set((s) => {
      if (s.drafts[t.id]) return s;
      return {
        drafts: {
          ...s.drafts,
          [t.id]: { theme: t.theme, pages: t.pages, extraPages: false, excluded: {}, title: t.name },
        },
      };
    }),
  setTheme: (tripId, theme) => set((s) => ({ drafts: { ...s.drafts, [tripId]: { ...s.drafts[tripId], theme } } })),
  setPages: (tripId, pages) =>
    set((s) => ({ drafts: { ...s.drafts, [tripId]: { ...s.drafts[tripId], pages: Math.max(20, Math.min(60, pages)) } } })),
  toggleExtraPages: (tripId) =>
    set((s) => {
      const d = s.drafts[tripId];
      const extraPages = !d.extraPages;
      return { drafts: { ...s.drafts, [tripId]: { ...d, extraPages, pages: d.pages + (extraPages ? 8 : -8) } } };
    }),
  togglePhoto: (tripId, key) =>
    set((s) => {
      const d = s.drafts[tripId];
      const excluded = { ...d.excluded, [key]: !d.excluded[key] };
      return { drafts: { ...s.drafts, [tripId]: { ...d, excluded } } };
    }),
  setTitle: (tripId, title) => set((s) => ({ drafts: { ...s.drafts, [tripId]: { ...s.drafts[tripId], title } } })),
  placeOrder: (tripId) => set((s) => ({ orders: [...s.orders, tripId] })),
}));

export const getTrip = (id?: string): Trip | undefined => seedTrips.find((t) => t.id === id);
