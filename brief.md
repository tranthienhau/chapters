# Chapters - Source Brief

## Title
Chapters

## Description
Chapters is a travel photobook app that builds the book for you. It watches, with the user's
consent, for the end of a trip, curates the best photos from that trip, lays them out in a
recommended editorial theme, and delivers a finished draft the moment the traveler gets home. A
user opens the "welcome home" card, swipes through the auto-generated spread, tweaks the theme or
the photo selection if they want, customizes the cover and page count, and orders a printed book,
all in a few taps. The whole experience is warm and photo-forward, closer to flipping through a
keepsake than filling in a form.

## Store links
Not yet published (portfolio proof-of-concept).

## Platform
iOS and Android (single Expo / React Native codebase).

## Category
Photography / Travel / Lifestyle

## Features
- Auto-generated draft photobook per trip, one cover card each with dates, place, and photo count.
- Location-triggered "welcome home" moment that surfaces the finished draft after a trip.
- AI theme recommendation across Editorial, Iconic, Minimal, and Classic layouts, with a short
  rationale for the suggested style.
- AI photo curation: the best shots come pre-selected with star badges; tap to include or exclude.
- Editorial two-page spread preview with a theme chip row.
- Book customization: editable cover title, page stepper, cover finish, size, and an extra-pages
  upsell.
- Checkout with format and size options, a live price breakdown, address, and order placement.
- Alerts center for trip-completion and location-triggered reminders.
- Profile with photo and location permission toggles, orders, and travel stats.
- Warm, on-device onboarding that frames access as a personal travel assistant, not tracking.

## Tech stack
- Expo / React Native + TypeScript.
- Expo Router for typed, file-based, deep-linkable navigation (a tab shell plus pushed detail
  screens).
- Zustand for state (permissions, per-trip draft, orders).
- expo-linear-gradient for the brand gradients; @expo/vector-icons for iconography.
- Fraunces (display) + Inter (body) via @expo-google-fonts.

## Industry
Consumer photography and print-on-demand travel keepsakes.

## Metrics
Unpublished proof-of-concept, so no store ratings or install numbers. Scope: 12 core screens
(onboarding, permissions, home + empty state, welcome-home, preview, theme picker, curation,
customize, checkout, alerts, profile), fully demoable offline on a simulator.

## Research notes
- Verified: all navigation, the Zustand draft/order flow, theme selection, photo include/exclude,
  page and price math, and the permission toggles are real and interactive.
- Mocked / fixture: trips, alerts, the user, and travel imagery are bundled sample data. There is
  no real media-library scan, geofencing, or backend; the "trip detected" and "AI picks" are
  simulated behind taps so the app runs on a bare simulator with no hardware.
- Future expansion: real photo-library access with on-device best-shot scoring, background
  geofencing to fire the welcome-home trigger, a print/fulfillment backend and payment, and push
  notifications for the trip-summary alert.
