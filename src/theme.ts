// Chapters design tokens - warm editorial travel-photobook.
// Mirrors out/design/chapters/DESIGN.md (brand-matched to printchapters.com).

export const colors = {
  accent: '#C15F3C', // terracotta - primary CTA, active states
  accentPressed: '#9C4A2C',
  accentDark: '#8F3F26',
  accentTint: '#F3E3DA', // selected chip / subtle fill
  support: '#8B9E86', // sage green - secondary accents, tags
  supportTint: '#E4EAE0',
  background: '#FAF5EE', // warm cream
  surface: '#FFFDF9', // card surface (cream, a touch brighter)
  surfaceAlt: '#F2EADE', // sand - inputs, chips
  textPrimary: '#2B2622', // warm charcoal
  textSecondary: '#6B6259',
  textTertiary: '#9A9088',
  hairline: 'rgba(43,38,34,0.08)',
  white: '#FFFFFF',
  draft: '#C15F3C',
  ordered: '#8B9E86',
};

export const radius = { card: 20, button: 14, chip: 999, tile: 16 };

export const shadow = {
  card: {
    shadowColor: '#2B2622',
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  soft: {
    shadowColor: '#2B2622',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
};

// Font families registered in app/_layout.tsx
export const fonts = {
  display: 'Fraunces_600SemiBold',
  displayBold: 'Fraunces_700Bold',
  body: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
};

export const type = {
  display: { fontFamily: fonts.displayBold, fontSize: 32, color: colors.textPrimary },
  title: { fontFamily: fonts.display, fontSize: 22, color: colors.textPrimary },
  bookTitle: { fontFamily: fonts.display, fontSize: 20, color: colors.textPrimary },
  body: { fontFamily: fonts.body, fontSize: 15, color: colors.textSecondary },
  label: { fontFamily: fonts.semibold, fontSize: 14, color: colors.textPrimary },
  caption: { fontFamily: fonts.medium, fontSize: 12, color: colors.textTertiary },
};
