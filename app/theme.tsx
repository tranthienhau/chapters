import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../src/ui';
import { colors, fonts, radius, shadow } from '../src/theme';
import { themes } from '../src/data';
import { photos } from '../src/photos';
import { useStore, getTrip } from '../src/store';

export default function ThemePicker() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const trip = getTrip(id) ?? getTrip('italy')!;
  const { drafts, ensureDraft, setTheme } = useStore();
  useEffect(() => ensureDraft(trip), [trip.id]);
  const current = drafts[trip.id]?.theme ?? 'Editorial';
  const [selected, setSelected] = useState(current);

  const previewPhoto = trip.photos.find((p) => p.aiPick)?.key ?? trip.cover;

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="close" size={26} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.topTitle}>Choose a style</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        <View style={styles.previewCard}>
          <Image source={photos[previewPhoto]} style={styles.previewImg} />
          <View style={styles.previewTag}>
            <Text style={styles.previewTagText}>{selected} preview</Text>
          </View>
        </View>

        {themes.map((t) => {
          const active = selected === t.name;
          return (
            <Pressable key={t.id} onPress={() => setSelected(t.name)} style={[styles.option, active && styles.optionActive]}>
              <View style={[styles.thumb, active && { borderColor: colors.accent }]}>
                <Ionicons
                  name={t.id === 'editorial' ? 'image' : t.id === 'iconic' ? 'grid' : t.id === 'minimal' ? 'square-outline' : 'albums'}
                  size={22}
                  color={active ? colors.accent : colors.textTertiary}
                />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.optionHead}>
                  <Text style={styles.optionName}>{t.name}</Text>
                  {t.recommended && (
                    <View style={styles.recBadge}>
                      <Ionicons name="sparkles" size={11} color={colors.accent} />
                      <Text style={styles.recText}>Recommended</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.optionBlurb}>{t.blurb}</Text>
              </View>
              <Ionicons
                name={active ? 'radio-button-on' : 'radio-button-off'}
                size={22}
                color={active ? colors.accent : colors.textTertiary}
              />
            </Pressable>
          );
        })}

        <View style={styles.why}>
          <Ionicons name="bulb-outline" size={16} color={colors.support} />
          <Text style={styles.whyText}>
            We picked Editorial because your trip has lots of wide scenery that looks best in full-bleed spreads.
          </Text>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Button
          label="Use this style"
          onPress={() => {
            setTheme(trip.id, selected);
            router.back();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, height: 44 },
  topTitle: { fontFamily: fonts.display, fontSize: 19, color: colors.textPrimary },
  previewCard: { marginHorizontal: 20, marginTop: 12, borderRadius: radius.card, overflow: 'hidden', ...shadow.card },
  previewImg: { width: '100%', height: 200 },
  previewTag: { position: 'absolute', bottom: 12, left: 12, backgroundColor: 'rgba(43,38,34,0.6)', paddingHorizontal: 12, height: 30, borderRadius: radius.chip, justifyContent: 'center' },
  previewTagText: { fontFamily: fonts.semibold, fontSize: 12, color: colors.white },
  option: { flexDirection: 'row', alignItems: 'center', gap: 14, marginHorizontal: 20, marginTop: 14, backgroundColor: colors.surface, borderRadius: radius.card, padding: 14, borderWidth: 1.5, borderColor: 'transparent', ...shadow.soft },
  optionActive: { borderColor: colors.accent, backgroundColor: '#FFF7F1' },
  thumb: { width: 46, height: 46, borderRadius: radius.tile, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: 'transparent' },
  optionHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  optionName: { fontFamily: fonts.display, fontSize: 17, color: colors.textPrimary },
  recBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: colors.accentTint, paddingHorizontal: 8, height: 22, borderRadius: radius.chip },
  recText: { fontFamily: fonts.semibold, fontSize: 11, color: colors.accent },
  optionBlurb: { fontFamily: fonts.body, fontSize: 13, lineHeight: 18, color: colors.textSecondary, marginTop: 3, paddingRight: 6 },
  why: { flexDirection: 'row', gap: 8, marginHorizontal: 20, marginTop: 20, paddingHorizontal: 4 },
  whyText: { flex: 1, fontFamily: fonts.body, fontSize: 13, lineHeight: 19, color: colors.textSecondary },
  footer: { paddingHorizontal: 20, paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.hairline, backgroundColor: colors.background },
});
