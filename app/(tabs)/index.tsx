import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, StatusBadge } from '../../src/ui';
import { colors, fonts, radius, shadow } from '../../src/theme';
import { trips, Trip } from '../../src/data';
import { photos } from '../../src/photos';

function HeroCard({ trip, onPress }: { trip: Trip; onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <Card style={styles.hero}>
        <Image source={photos[trip.cover]} style={styles.heroImg} />
        {trip.isNew && (
          <View style={styles.newTag}>
            <Ionicons name="sparkles" size={12} color={colors.white} />
            <Text style={styles.newTagText}>New draft ready</Text>
          </View>
        )}
        <View style={styles.heroBody}>
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>{trip.name}</Text>
            <View style={styles.metaRow}>
              <Ionicons name="calendar-outline" size={14} color={colors.textTertiary} />
              <Text style={styles.meta}>{trip.dateRange}</Text>
              <Ionicons name="images-outline" size={14} color={colors.textTertiary} style={{ marginLeft: 12 }} />
              <Text style={styles.meta}>{trip.photoCount} photos</Text>
            </View>
          </View>
          <StatusBadge status={trip.status} />
        </View>
      </Card>
    </Pressable>
  );
}

function RowCard({ trip, onPress }: { trip: Trip; onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <Card style={styles.row}>
        <Image source={photos[trip.cover]} style={styles.rowImg} />
        <View style={{ flex: 1, marginLeft: 14 }}>
          <Text style={styles.rowTitle}>{trip.name}</Text>
          <Text style={styles.rowPlace}>{trip.place}</Text>
          <View style={{ marginTop: 8, alignSelf: 'flex-start' }}>
            <StatusBadge status={trip.status} />
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
      </Card>
    </Pressable>
  );
}

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { empty } = useLocalSearchParams<{ empty?: string }>();

  const open = (trip: Trip) => router.push({ pathname: '/preview', params: { id: trip.id } });

  if (empty === '1') {
    return (
      <View style={[styles.root, { paddingTop: insets.top + 16 }]}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning, traveler</Text>
          <Text style={styles.title}>My Chapters</Text>
        </View>
        <View style={styles.emptyWrap}>
          <View style={styles.emptyArt}>
            <Ionicons name="book-outline" size={64} color={colors.accent} />
            <Ionicons name="airplane" size={26} color={colors.support} style={styles.emptyPlane} />
          </View>
          <Text style={styles.emptyTitle}>No chapters yet</Text>
          <Text style={styles.emptyBody}>
            Take a trip and we&apos;ll build your first photobook automatically. Your next journey becomes a book.
          </Text>
          <Button label="Create one manually" onPress={() => router.push('/permissions')} style={{ marginTop: 8, alignSelf: 'stretch' }} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: insets.top + 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning, traveler</Text>
          <Text style={styles.title}>My Chapters</Text>
        </View>

        <HeroCard trip={trips[0]} onPress={() => open(trips[0])} />

        <Text style={styles.sectionLabel}>PAST JOURNEYS</Text>
        {trips.slice(1).map((t) => (
          <RowCard key={t.id} trip={t} onPress={() => open(t)} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { marginBottom: 18 },
  greeting: { fontFamily: fonts.medium, fontSize: 14, color: colors.textSecondary },
  title: { fontFamily: fonts.displayBold, fontSize: 32, color: colors.textPrimary, marginTop: 2 },
  hero: { overflow: 'hidden' },
  heroImg: { width: '100%', height: 200 },
  newTag: {
    position: 'absolute',
    top: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    height: 30,
    borderRadius: radius.chip,
  },
  newTagText: { fontFamily: fonts.semibold, fontSize: 12, color: colors.white },
  heroBody: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  heroTitle: { fontFamily: fonts.display, fontSize: 20, color: colors.textPrimary },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  meta: { fontFamily: fonts.medium, fontSize: 12, color: colors.textTertiary, marginLeft: 5 },
  sectionLabel: { fontFamily: fonts.semibold, fontSize: 12, letterSpacing: 1.2, color: colors.textTertiary, marginTop: 26, marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', padding: 12, marginBottom: 12 },
  rowImg: { width: 64, height: 64, borderRadius: radius.tile },
  rowTitle: { fontFamily: fonts.display, fontSize: 17, color: colors.textPrimary },
  rowPlace: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40, paddingBottom: 80 },
  emptyArt: { width: 120, height: 120, borderRadius: 60, backgroundColor: colors.accentTint, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  emptyPlane: { position: 'absolute', top: 26, right: 22 },
  emptyTitle: { fontFamily: fonts.display, fontSize: 22, color: colors.textPrimary },
  emptyBody: { fontFamily: fonts.body, fontSize: 14, lineHeight: 21, color: colors.textSecondary, textAlign: 'center', marginTop: 10, marginBottom: 22 },
});
