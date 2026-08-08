# Chapters - Design System

Premium editorial travel-photobook app. Warm, nostalgic yet modern. Photo-forward,
minimalist, calm. Brand-matched to printchapters.com.

## Color (use these EXACT hexes - do NOT use generic violet #6366F1 or flat grey #6B7280)
- Accent (terracotta): #C15F3C   - primary CTA, active states, links
- Accent pressed: #9C4A2C
- Accent dark: #8F3F26
- Accent tint: #F3E3DA           - selected chip / subtle fill
- Support (sage green): #8B9E86  - secondary accents, tags, illustration
- Background (warm cream): #FAF5EE
- Surface alt (sand): #F2EADE    - cards, input fills
- Text primary (warm charcoal): #2B2622
- Text secondary: #6B6259
- Text tertiary: #9A9088
- Card border hairline: rgba(43,38,34,0.08)

Neutrals stay warm (tinted toward cream), never cold grey.

## Typography
- Display / headings: Fraunces (serif, editorial, soft optical). Weights 600-700.
  Use for screen titles, book titles, hero numbers.
- Body / UI: Inter (sans). Weights 400-600.
- Scale: display 34/700, title 22/600, body 16/400, label 14/600, caption 12/500.

## Frame + safe areas
- 393x852 (iPhone 16/17). Keep top ~59px and bottom ~34px insets clear.

## Icons
- One set only: rounded outline, 24px, 1.75 stroke.

## Radius + elevation
- Card radius 20, button radius 14, chips fully pill (999).
- Soft warm shadow: rgba(43,38,34,0.08), y8, blur24. No hard borders.

## Controls (one spec each, reused everywhere)
- Button primary: terracotta #C15F3C fill, white text, radius 14, 52px tall.
  Pressed #9C4A2C. Disabled = accent at 35% on cream.
- Button secondary: cream surface, charcoal text, hairline border.
- Input: sand #F2EADE fill, radius 14, charcoal text; focus = terracotta ring; error red.
- Card: cream surface on cream bg separated by soft shadow, radius 20, generous padding.
- Chip: pill; selected = accent tint #F3E3DA fill + terracotta text; idle = sand + charcoal.

## Gradient + focal rules
- Soft accent->support gradient (terracotta -> sage) on onboarding hero and the
  welcome-home / trip-detected hero surface, and behind primary CTAs. Tab bar stays flat cream.
- Every screen has ONE bold focal element: a large book cover, a hero photo, a big number
  (photo count), or a full-bleed editorial spread. Photography owns the visual weight.

## Shared components
### Bottom tab bar (verbatim on every core screen)
Exactly THREE tabs, in this order: Chapters, Alerts, Profile.
- Icons: Chapters=book, Alerts=bell, Profile=user (rounded outline 24px).
- Active tab: terracotta #C15F3C icon + label. Inactive: warm grey #9A9088.
- Flat cream bar, hairline top divider. Do NOT rename, reorder, add, or remove tabs.
- Full-screen / modal / onboarding / preview / checkout screens render NO tab bar.
