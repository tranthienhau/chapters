import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radius, shadow } from '../../src/theme';
import { user } from '../../src/data';
import { useStore } from '../../src/store';

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function LinkRow({ icon, label, value }: { icon: keyof typeof Ionicons.glyphMap; label: string; value?: string }) {
  return (
    <View style={styles.linkRow}>
      <Ionicons name={icon} size={20} color={colors.textSecondary} />
      <Text style={styles.linkLabel}>{label}</Text>
      {value && <Text style={styles.linkValue}>{value}</Text>}
      <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
    </View>
  );
}

export default function Profile() {
  const insets = useSafeAreaInsets();
  const { grants, setGrant, orders } = useStore();

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: insets.top + 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Profile</Text>

        <View style={styles.headerCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>EC</Text>
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <View style={styles.statsRow}>
            <Stat label="Trips" value={user.stats.trips} />
            <View style={styles.statDivider} />
            <Stat label="Books" value={user.stats.books + orders.length} />
            <View style={styles.statDivider} />
            <Stat label="Photos" value={user.stats.photos} />
          </View>
        </View>

        <Text style={styles.groupLabel}>PERMISSIONS</Text>
        <View style={styles.group}>
          <View style={styles.toggleRow}>
            <Ionicons name="images-outline" size={20} color={colors.textSecondary} />
            <Text style={styles.toggleLabel}>Photos</Text>
            <Switch
              value={grants.photos}
              onValueChange={(v) => setGrant('photos', v)}
              trackColor={{ true: colors.accent, false: colors.surfaceAlt }}
              thumbColor={colors.white}
            />
          </View>
          <View style={styles.rowDivider} />
          <View style={styles.toggleRow}>
            <Ionicons name="location-outline" size={20} color={colors.textSecondary} />
            <Text style={styles.toggleLabel}>Location</Text>
            <Switch
              value={grants.location}
              onValueChange={(v) => setGrant('location', v)}
              trackColor={{ true: colors.accent, false: colors.surfaceAlt }}
              thumbColor={colors.white}
            />
          </View>
        </View>

        <Text style={styles.groupLabel}>ACCOUNT</Text>
        <View style={styles.group}>
          <LinkRow icon="cube-outline" label="My orders" value={`${orders.length + 3}`} />
          <View style={styles.rowDivider} />
          <LinkRow icon="map-outline" label="Travel history" />
          <View style={styles.rowDivider} />
          <LinkRow icon="notifications-outline" label="Notification preferences" />
          <View style={styles.rowDivider} />
          <LinkRow icon="help-circle-outline" label="Help & support" />
        </View>

        <View style={styles.signOut}>
          <Text style={styles.signOutText}>Sign out</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  title: { fontFamily: fonts.displayBold, fontSize: 32, color: colors.textPrimary, marginBottom: 18 },
  headerCard: { backgroundColor: colors.surface, borderRadius: radius.card, padding: 22, alignItems: 'center', ...shadow.card },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.accentTint, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: fonts.displayBold, fontSize: 26, color: colors.accent },
  name: { fontFamily: fonts.display, fontSize: 22, color: colors.textPrimary, marginTop: 12 },
  email: { fontFamily: fonts.body, fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 18 },
  stat: { alignItems: 'center', paddingHorizontal: 22 },
  statValue: { fontFamily: fonts.displayBold, fontSize: 22, color: colors.textPrimary },
  statLabel: { fontFamily: fonts.medium, fontSize: 12, color: colors.textTertiary, marginTop: 2 },
  statDivider: { width: 1, height: 32, backgroundColor: colors.hairline },
  groupLabel: { fontFamily: fonts.semibold, fontSize: 12, letterSpacing: 1.2, color: colors.textTertiary, marginTop: 24, marginBottom: 10 },
  group: { backgroundColor: colors.surface, borderRadius: radius.card, ...shadow.soft, overflow: 'hidden' },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 16, height: 56 },
  toggleLabel: { flex: 1, fontFamily: fonts.medium, fontSize: 15, color: colors.textPrimary },
  rowDivider: { height: 1, backgroundColor: colors.hairline, marginLeft: 50 },
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 16, height: 56 },
  linkLabel: { flex: 1, fontFamily: fonts.medium, fontSize: 15, color: colors.textPrimary },
  linkValue: { fontFamily: fonts.medium, fontSize: 14, color: colors.textTertiary, marginRight: 6 },
  signOut: { alignItems: 'center', marginTop: 24 },
  signOutText: { fontFamily: fonts.semibold, fontSize: 15, color: colors.accent },
});
