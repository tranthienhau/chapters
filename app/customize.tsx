import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../src/ui';
import { colors, fonts, radius, shadow } from '../src/theme';
import { photos } from '../src/photos';
import { useStore, getTrip } from '../src/store';

const FINISHES = ['Matte', 'Linen', 'Glossy'];
const SIZES = ['A5', 'Square', 'A4'];

export default function Customize() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const trip = getTrip(id) ?? getTrip('italy')!;
  const { drafts, ensureDraft, setPages, toggleExtraPages, setTitle } = useStore();
  useEffect(() => ensureDraft(trip), [trip.id]);
  const draft = drafts[trip.id];
  const [finish, setFinish] = useState('Linen');
  const [size, setSize] = useState('Square');
  if (!draft) return <View style={styles.root} />;

  return (
    <View style={[styles.root, { paddingTop: insets.top + 6 }]}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.topTitle}>Customize your book</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        <View style={styles.coverCard}>
          <Image source={photos[trip.cover]} style={styles.coverImg} />
          <View style={styles.coverOverlay}>
            <Text style={styles.coverLabel}>COVER TITLE</Text>
            <TextInput
              value={draft.title}
              onChangeText={(t) => setTitle(trip.id, t)}
              style={styles.coverInput}
              placeholderTextColor={colors.textTertiary}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.rowTitle}>Pages</Text>
              <Text style={styles.rowSub}>{draft.pages} pages, {draft.theme} layout</Text>
            </View>
            <View style={styles.stepper}>
              <Pressable onPress={() => setPages(trip.id, draft.pages - 2)} style={styles.stepBtn}>
                <Ionicons name="remove" size={18} color={colors.textPrimary} />
              </Pressable>
              <Text style={styles.stepVal}>{draft.pages}</Text>
              <Pressable onPress={() => setPages(trip.id, draft.pages + 2)} style={styles.stepBtn}>
                <Ionicons name="add" size={18} color={colors.textPrimary} />
              </Pressable>
            </View>
          </View>

          <Text style={[styles.rowTitle, { marginTop: 20 }]}>Cover finish</Text>
          <View style={styles.chips}>
            {FINISHES.map((f) => (
              <Pressable key={f} onPress={() => setFinish(f)} style={[styles.opt, finish === f && styles.optOn]}>
                <Text style={[styles.optText, finish === f && { color: colors.accent }]}>{f}</Text>
              </Pressable>
            ))}
          </View>

          <Text style={[styles.rowTitle, { marginTop: 20 }]}>Size</Text>
          <View style={styles.chips}>
            {SIZES.map((s) => (
              <Pressable key={s} onPress={() => setSize(s)} style={[styles.opt, size === s && styles.optOn]}>
                <Text style={[styles.optText, size === s && { color: colors.accent }]}>{s}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Pressable style={styles.upsell} onPress={() => toggleExtraPages(trip.id)}>
          <View style={styles.upsellIcon}>
            <Ionicons name="add-circle-outline" size={22} color={colors.accent} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.upsellTitle}>Add 8 extra pages</Text>
            <Text style={styles.upsellBody}>Room for your favourite moments, +6.00</Text>
          </View>
          <View style={[styles.addBtn, draft.extraPages && styles.addBtnOn]}>
            <Text style={[styles.addText, draft.extraPages && { color: colors.white }]}>{draft.extraPages ? 'Added' : 'Add'}</Text>
          </View>
        </Pressable>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Button label="Continue to order" onPress={() => router.push({ pathname: '/checkout', params: { id: trip.id } })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 44 },
  topTitle: { fontFamily: fonts.display, fontSize: 19, color: colors.textPrimary },
  coverCard: { marginHorizontal: 20, marginTop: 12, borderRadius: radius.card, overflow: 'hidden', ...shadow.card },
  coverImg: { width: '100%', height: 210 },
  coverOverlay: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16, backgroundColor: 'rgba(43,38,34,0.42)' },
  coverLabel: { fontFamily: fonts.semibold, fontSize: 10, letterSpacing: 1.5, color: 'rgba(255,255,255,0.8)' },
  coverInput: { fontFamily: fonts.display, fontSize: 22, color: colors.white, padding: 0, marginTop: 2 },
  section: { marginHorizontal: 20, marginTop: 16, backgroundColor: colors.surface, borderRadius: radius.card, padding: 18, ...shadow.soft },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowTitle: { fontFamily: fonts.semibold, fontSize: 15, color: colors.textPrimary },
  rowSub: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  stepper: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceAlt, borderRadius: radius.chip, padding: 4, gap: 6 },
  stepBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  stepVal: { fontFamily: fonts.semibold, fontSize: 15, color: colors.textPrimary, minWidth: 26, textAlign: 'center' },
  chips: { flexDirection: 'row', gap: 10, marginTop: 10 },
  opt: { paddingHorizontal: 18, height: 40, borderRadius: radius.button, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center' },
  optOn: { backgroundColor: colors.accentTint },
  optText: { fontFamily: fonts.semibold, fontSize: 14, color: colors.textSecondary },
  upsell: { flexDirection: 'row', alignItems: 'center', gap: 12, marginHorizontal: 20, marginTop: 16, backgroundColor: '#FBEDE4', borderRadius: radius.card, padding: 16, borderWidth: 1, borderColor: colors.accentTint },
  upsellIcon: { width: 42, height: 42, borderRadius: radius.tile, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  upsellTitle: { fontFamily: fonts.semibold, fontSize: 15, color: colors.textPrimary },
  upsellBody: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  addBtn: { paddingHorizontal: 18, height: 38, borderRadius: radius.chip, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.accent },
  addBtnOn: { backgroundColor: colors.accent, borderColor: colors.accent },
  addText: { fontFamily: fonts.semibold, fontSize: 14, color: colors.accent },
  footer: { paddingHorizontal: 20, paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.hairline, backgroundColor: colors.background },
});
