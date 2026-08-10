import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radius, shadow } from '../../src/theme';
import { alerts, Alert } from '../../src/data';
import { photos } from '../../src/photos';

const ICON: Record<Alert['kind'], keyof typeof Ionicons.glyphMap> = {
  welcome: 'home',
  left: 'location',
  shipped: 'cube',
  theme: 'color-palette',
  backup: 'cloud-done',
};

export default function Alerts() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: insets.top + 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Alerts</Text>

        {alerts.map((a) =>
          a.highlight ? (
            <Pressable
              key={a.id}
              style={styles.hero}
              onPress={() => router.push({ pathname: '/welcome-home' })}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.heroKicker}>DRAFT READY</Text>
                <Text style={styles.heroTitle}>{a.title}</Text>
                <Text style={styles.heroBody}>{a.body}</Text>
                <View style={styles.reviewRow}>
                  <Text style={styles.review}>Review draft</Text>
                  <Ionicons name="arrow-forward" size={14} color={colors.accent} />
                </View>
              </View>
              <Image source={photos.amalfi} style={styles.heroThumb} />
            </Pressable>
          ) : (
            <View key={a.id} style={styles.card}>
              <View style={[styles.iconTile, { backgroundColor: (a.kind === 'shipped' ? colors.support : colors.accent) + '1E' }]}>
                <Ionicons name={ICON[a.kind]} size={20} color={a.kind === 'shipped' ? colors.support : colors.accent} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{a.title}</Text>
                <Text style={styles.cardBody}>{a.body}</Text>
              </View>
              <Text style={styles.time}>{a.time}</Text>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  title: { fontFamily: fonts.displayBold, fontSize: 32, color: colors.textPrimary, marginBottom: 18 },
  hero: { flexDirection: 'row', backgroundColor: '#FBEDE4', borderRadius: radius.card, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: colors.accentTint },
  heroKicker: { fontFamily: fonts.semibold, fontSize: 11, letterSpacing: 1.5, color: colors.accentDark },
  heroTitle: { fontFamily: fonts.display, fontSize: 19, color: colors.textPrimary, marginTop: 4 },
  heroBody: { fontFamily: fonts.body, fontSize: 13, lineHeight: 19, color: colors.textSecondary, marginTop: 4, paddingRight: 8 },
  reviewRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10 },
  review: { fontFamily: fonts.semibold, fontSize: 14, color: colors.accent },
  heroThumb: { width: 76, height: 76, borderRadius: radius.tile, marginLeft: 8 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.card, padding: 14, marginBottom: 12, ...shadow.soft },
  iconTile: { width: 44, height: 44, borderRadius: radius.tile, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  cardTitle: { fontFamily: fonts.semibold, fontSize: 15, color: colors.textPrimary },
  cardBody: { fontFamily: fonts.body, fontSize: 13, lineHeight: 18, color: colors.textSecondary, marginTop: 2, paddingRight: 6 },
  time: { fontFamily: fonts.medium, fontSize: 12, color: colors.textTertiary, marginLeft: 8, alignSelf: 'flex-start', marginTop: 2 },
});
