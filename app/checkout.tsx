import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../src/ui';
import { colors, fonts, radius, shadow } from '../src/theme';
import { photos } from '../src/photos';
import { useStore, getTrip } from '../src/store';

export default function Checkout() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const trip = getTrip(id) ?? getTrip('italy')!;
  const { drafts, ensureDraft, placeOrder } = useStore();
  useEffect(() => ensureDraft(trip), [trip.id]);
  const draft = drafts[trip.id];
  const [format, setFormat] = useState('Hardcover');
  const [size, setSize] = useState('Square');
  const [placed, setPlaced] = useState(false);
  if (!draft) return <View style={styles.root} />;

  const book = 34.95;
  const extra = draft.extraPages ? 6.0 : 0;
  const shipping = 3.95;
  const total = book + extra + shipping;

  if (placed) {
    return (
      <View style={[styles.root, styles.center, { paddingTop: insets.top }]}>
        <View style={styles.successCircle}>
          <Ionicons name="checkmark" size={48} color={colors.white} />
        </View>
        <Text style={styles.successTitle}>Order placed</Text>
        <Text style={styles.successBody}>Your {trip.name} book is on its way. Arrives in 5-7 days.</Text>
        <Button label="Back to my chapters" onPress={() => router.replace('/(tabs)')} style={{ marginTop: 24, alignSelf: 'stretch', marginHorizontal: 30 }} />
      </View>
    );
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top + 6 }]}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.topTitle}>Order your book</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        <View style={styles.summary}>
          <Image source={photos[trip.cover]} style={styles.thumb} />
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={styles.bookName}>{draft.title}</Text>
            <Text style={styles.bookMeta}>{draft.pages} pages, {format}</Text>
            <Text style={styles.bookMeta}>{draft.theme} layout</Text>
          </View>
        </View>

        <Text style={styles.groupLabel}>FORMAT</Text>
        <View style={styles.opts}>
          {['Softcover', 'Hardcover'].map((f) => (
            <Pressable key={f} onPress={() => setFormat(f)} style={[styles.opt, format === f && styles.optOn]}>
              <Text style={[styles.optText, format === f && { color: colors.accent }]}>{f}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.groupLabel}>SIZE</Text>
        <View style={styles.opts}>
          {['A5', 'Square', 'A4'].map((s) => (
            <Pressable key={s} onPress={() => setSize(s)} style={[styles.opt, size === s && styles.optOn]}>
              <Text style={[styles.optText, size === s && { color: colors.accent }]}>{s}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.priceCard}>
          <Row label={`${format} book`} value={`£${book.toFixed(2)}`} />
          {extra > 0 && <Row label="Extra pages" value={`£${extra.toFixed(2)}`} />}
          <Row label="Shipping" value={`£${shipping.toFixed(2)}`} />
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>£{total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.addressRow}>
          <Ionicons name="location-outline" size={20} color={colors.support} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.addrName}>Emma Carter</Text>
            <Text style={styles.addrLine}>14 Cranbourn St, London WC2H</Text>
          </View>
          <Text style={styles.change}>Change</Text>
        </View>

        <View style={styles.eta}>
          <Ionicons name="cube-outline" size={16} color={colors.textTertiary} />
          <Text style={styles.etaText}>Arrives in 5-7 days</Text>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Button label={`Place order  -  £${total.toFixed(2)}`} onPress={() => { placeOrder(trip.id); setPlaced(true); }} />
      </View>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.priceRow}>
      <Text style={styles.priceLabel}>{label}</Text>
      <Text style={styles.priceValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  center: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 44 },
  topTitle: { fontFamily: fonts.display, fontSize: 19, color: colors.textPrimary },
  summary: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 12, backgroundColor: colors.surface, borderRadius: radius.card, padding: 14, ...shadow.soft },
  thumb: { width: 64, height: 80, borderRadius: radius.tile },
  bookName: { fontFamily: fonts.display, fontSize: 18, color: colors.textPrimary },
  bookMeta: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  groupLabel: { fontFamily: fonts.semibold, fontSize: 12, letterSpacing: 1.2, color: colors.textTertiary, marginLeft: 20, marginTop: 22, marginBottom: 10 },
  opts: { flexDirection: 'row', gap: 10, paddingHorizontal: 20 },
  opt: { flex: 1, height: 46, borderRadius: radius.button, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center' },
  optOn: { backgroundColor: colors.accentTint, borderWidth: 1.5, borderColor: colors.accent },
  optText: { fontFamily: fonts.semibold, fontSize: 14, color: colors.textSecondary },
  priceCard: { marginHorizontal: 20, marginTop: 22, backgroundColor: colors.surface, borderRadius: radius.card, padding: 18, ...shadow.soft },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  priceLabel: { fontFamily: fonts.body, fontSize: 14, color: colors.textSecondary },
  priceValue: { fontFamily: fonts.medium, fontSize: 14, color: colors.textPrimary },
  divider: { height: 1, backgroundColor: colors.hairline, marginVertical: 4 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  totalLabel: { fontFamily: fonts.semibold, fontSize: 16, color: colors.textPrimary },
  totalValue: { fontFamily: fonts.displayBold, fontSize: 20, color: colors.accent },
  addressRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 16, backgroundColor: colors.surface, borderRadius: radius.card, padding: 16, ...shadow.soft },
  addrName: { fontFamily: fonts.semibold, fontSize: 14, color: colors.textPrimary },
  addrLine: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  change: { fontFamily: fonts.semibold, fontSize: 13, color: colors.accent },
  eta: { flexDirection: 'row', alignItems: 'center', gap: 6, justifyContent: 'center', marginTop: 16 },
  etaText: { fontFamily: fonts.medium, fontSize: 13, color: colors.textTertiary },
  footer: { paddingHorizontal: 20, paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.hairline, backgroundColor: colors.background },
  successCircle: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.support, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  successTitle: { fontFamily: fonts.displayBold, fontSize: 26, color: colors.textPrimary },
  successBody: { fontFamily: fonts.body, fontSize: 15, lineHeight: 22, color: colors.textSecondary, textAlign: 'center', marginTop: 10, paddingHorizontal: 20 },
});
