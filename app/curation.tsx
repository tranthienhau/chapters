import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../src/ui';
import { colors, fonts, radius } from '../src/theme';
import { photos } from '../src/photos';
import { useStore, getTrip } from '../src/store';

const { width } = Dimensions.get('window');
const GAP = 4;
const COL = 3;
const SIZE = (width - 40 - GAP * (COL - 1)) / COL;

const FILTERS = ['All', 'AI picks', 'People', 'Scenery', 'Food'] as const;

export default function Curation() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const trip = getTrip(id) ?? getTrip('italy')!;
  const { drafts, ensureDraft, togglePhoto } = useStore();
  useEffect(() => ensureDraft(trip), [trip.id]);
  const excluded = drafts[trip.id]?.excluded ?? {};
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('AI picks');

  const list = trip.photos.filter((p) => {
    if (filter === 'All') return true;
    if (filter === 'AI picks') return p.aiPick;
    return p.tag === filter;
  });
  const selectedCount = trip.photos.filter((p) => p.aiPick && !excluded[p.key]).length;

  return (
    <View style={[styles.root, { paddingTop: insets.top + 6 }]}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color={colors.textPrimary} />
        </Pressable>
        <View style={{ flex: 1, marginLeft: 6 }}>
          <Text style={styles.title}>Your best shots</Text>
          <Text style={styles.sub}>{selectedCount} of {trip.photoCount} selected</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        {FILTERS.map((f) => (
          <Pressable key={f} onPress={() => setFilter(f)} style={[styles.filter, filter === f ? styles.filterOn : styles.filterOff]}>
            {f === 'AI picks' && <Ionicons name="sparkles" size={13} color={filter === f ? colors.accent : colors.textSecondary} />}
            <Text style={[styles.filterText, { color: filter === f ? colors.accent : colors.textSecondary }]}>{f}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {list.map((p, i) => {
          const on = p.aiPick && !excluded[p.key];
          return (
            <Pressable key={p.key + i} onPress={() => togglePhoto(trip.id, p.key)} style={styles.cell}>
              <Image source={photos[p.key]} style={[styles.cellImg, !on && styles.dim]} />
              {p.aiPick && (
                <View style={styles.star}>
                  <Ionicons name="star" size={11} color={colors.white} />
                </View>
              )}
              <View style={[styles.check, on ? styles.checkOn : styles.checkOff]}>
                <Ionicons name={on ? 'checkmark' : 'add'} size={14} color={on ? colors.white : colors.textSecondary} />
              </View>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Text style={styles.footCount}>{selectedCount} selected</Text>
        <Button label="Looks good" onPress={() => router.back()} style={{ flex: 1, marginLeft: 14 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 8 },
  title: { fontFamily: fonts.display, fontSize: 22, color: colors.textPrimary },
  sub: { fontFamily: fonts.medium, fontSize: 13, color: colors.textSecondary, marginTop: 1 },
  filters: { paddingHorizontal: 20, paddingVertical: 10, gap: 8 },
  filter: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 14, height: 34, borderRadius: radius.chip },
  filterOn: { backgroundColor: colors.accentTint },
  filterOff: { backgroundColor: colors.surfaceAlt },
  filterText: { fontFamily: fonts.semibold, fontSize: 13 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GAP, paddingHorizontal: 20, paddingTop: 6, paddingBottom: 20 },
  cell: { width: SIZE, height: SIZE * 1.25, borderRadius: 10, overflow: 'hidden' },
  cellImg: { width: '100%', height: '100%' },
  dim: { opacity: 0.4 },
  star: { position: 'absolute', top: 6, left: 6, width: 22, height: 22, borderRadius: 11, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  check: { position: 'absolute', bottom: 6, right: 6, width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  checkOn: { backgroundColor: colors.accent },
  checkOff: { backgroundColor: 'rgba(255,253,249,0.9)' },
  footer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.hairline, backgroundColor: colors.background },
  footCount: { fontFamily: fonts.semibold, fontSize: 15, color: colors.textPrimary },
});
