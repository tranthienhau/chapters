import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Chip } from '../src/ui';
import { colors, fonts, radius, shadow } from '../src/theme';
import { themes } from '../src/data';
import { photos } from '../src/photos';
import { useStore, getTrip } from '../src/store';

export default function Preview() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const trip = getTrip(id) ?? getTrip('italy')!;
  const { drafts, ensureDraft, setTheme } = useStore();

  useEffect(() => ensureDraft(trip), [trip.id]);
  const draft = drafts[trip.id];
  const [page, setPage] = useState(4);

  const spread = trip.photos.filter((p) => p.aiPick);
  const left = spread[(page - 1) % spread.length];
  const right = spread[page % spread.length];
  const total = draft?.pages ?? trip.pages;

  return (
    <View style={[styles.root, { paddingTop: insets.top + 6 }]}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.topTitle} numberOfLines={1}>{trip.name}</Text>
        <Pressable style={styles.orderBtn} onPress={() => router.push({ pathname: '/customize', params: { id: trip.id } })}>
          <Text style={styles.orderText}>Order</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 20 }} showsVerticalScrollIndicator={false}>
        <View style={styles.spreadWrap}>
          <View style={styles.spread}>
            <View style={styles.pageHalf}>
              <Image source={photos[left.key]} style={styles.pageImg} />
            </View>
            <View style={styles.gutter} />
            <View style={styles.pageHalf}>
              <Image source={photos[right.key]} style={styles.pageImgSmall} />
              <Text style={styles.pageCaption}>{trip.place.split(',')[0]}, spring light</Text>
            </View>
          </View>
        </View>

        <View style={styles.pager}>
          <Pressable onPress={() => setPage((p) => Math.max(2, p - 1))} hitSlop={10}>
            <Ionicons name="chevron-back" size={20} color={colors.textTertiary} />
          </Pressable>
          <Text style={styles.pagerText}>Page {page} of {total}</Text>
          <Pressable onPress={() => setPage((p) => Math.min(total - 1, p + 1))} hitSlop={10}>
            <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
          </Pressable>
        </View>

        <Pressable style={styles.curateRow} onPress={() => router.push({ pathname: '/curation', params: { id: trip.id } })}>
          <Ionicons name="sparkles-outline" size={18} color={colors.accent} />
          <Text style={styles.curateText}>{trip.selectedCount} AI-picked photos</Text>
          <Text style={styles.curateEdit}>Edit selection</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
        </Pressable>

        <Text style={styles.themeLabel}>STYLE</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
          {themes.map((t) => (
            <Chip
              key={t.id}
              label={t.name}
              active={draft?.theme === t.name}
              onPress={() => setTheme(trip.id, t.name)}
            />
          ))}
          <Pressable style={styles.aiChip} onPress={() => router.push({ pathname: '/theme', params: { id: trip.id } })}>
            <Ionicons name="options-outline" size={15} color={colors.white} />
            <Text style={styles.aiChipText}>AI picks</Text>
          </Pressable>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, height: 48 },
  topTitle: { flex: 1, textAlign: 'center', fontFamily: fonts.display, fontSize: 19, color: colors.textPrimary },
  orderBtn: { backgroundColor: colors.accent, paddingHorizontal: 18, height: 38, borderRadius: radius.chip, alignItems: 'center', justifyContent: 'center' },
  orderText: { fontFamily: fonts.semibold, fontSize: 14, color: colors.white },
  spreadWrap: { paddingHorizontal: 20, marginTop: 20 },
  spread: {
    flexDirection: 'row',
    backgroundColor: '#EFE7DA',
    borderRadius: radius.card,
    padding: 12,
    height: 250,
    ...shadow.card,
  },
  pageHalf: { flex: 1, backgroundColor: '#FFFDF9', borderRadius: 6, overflow: 'hidden', padding: 8 },
  gutter: { width: 2, backgroundColor: 'rgba(43,38,34,0.10)' },
  pageImg: { flex: 1, borderRadius: 3 },
  pageImgSmall: { flex: 1, borderRadius: 3 },
  pageCaption: { fontFamily: fonts.display, fontSize: 11, color: colors.textSecondary, marginTop: 6 },
  pager: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 18, marginTop: 18 },
  pagerText: { fontFamily: fonts.medium, fontSize: 13, color: colors.textSecondary },
  curateRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 20, marginTop: 22, backgroundColor: colors.surface, borderRadius: radius.button, paddingHorizontal: 14, height: 52, ...shadow.soft },
  curateText: { fontFamily: fonts.medium, fontSize: 14, color: colors.textPrimary },
  curateEdit: { fontFamily: fonts.semibold, fontSize: 13, color: colors.accent, marginLeft: 'auto' },
  themeLabel: { fontFamily: fonts.semibold, fontSize: 12, letterSpacing: 1.2, color: colors.textTertiary, marginLeft: 20, marginTop: 26, marginBottom: 12 },
  chipRow: { paddingHorizontal: 20, alignItems: 'center' },
  aiChip: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: colors.support, paddingHorizontal: 14, height: 38, borderRadius: radius.chip },
  aiChipText: { fontFamily: fonts.semibold, fontSize: 13, color: colors.white },
});
