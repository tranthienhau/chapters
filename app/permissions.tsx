import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card } from '../src/ui';
import { colors, fonts, radius } from '../src/theme';
import { useStore } from '../src/store';

function PermRow({
  icon,
  tint,
  title,
  body,
  granted,
  onGrant,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  tint: string;
  title: string;
  body: string;
  granted: boolean;
  onGrant: () => void;
}) {
  return (
    <Card style={styles.permCard}>
      <View style={[styles.iconTile, { backgroundColor: tint + '22' }]}>
        <Ionicons name={icon} size={24} color={tint} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.permTitle}>{title}</Text>
        <Text style={styles.permBody}>{body}</Text>
      </View>
      <Button
        label={granted ? 'Allowed' : 'Allow'}
        variant={granted ? 'secondary' : 'primary'}
        onPress={onGrant}
        style={styles.allowBtn}
      />
    </Card>
  );
}

export default function Permissions() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { grants, setGrant } = useStore();

  return (
    <View style={[styles.root, { paddingTop: insets.top + 12 }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>SET UP</Text>
        <Text style={styles.title}>Meet your personal{'\n'}travel assistant</Text>
        <Text style={styles.lead}>
          Chapters works quietly in the background so your book is ready the moment a trip ends.
        </Text>

        <PermRow
          icon="images-outline"
          tint={colors.accent}
          title="Photos"
          body="So we can find your best trip shots."
          granted={grants.photos}
          onGrant={() => setGrant('photos', true)}
        />
        <PermRow
          icon="location-outline"
          tint={colors.support}
          title="Location"
          body="So we know when a trip ends and your book is ready."
          granted={grants.location}
          onGrant={() => setGrant('location', true)}
        />

        <View style={styles.reassure}>
          <Ionicons name="lock-closed-outline" size={16} color={colors.textTertiary} />
          <Text style={styles.reassureText}>
            Your photos stay private. We only look on-device, and never share your location.
          </Text>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Button label="Continue" onPress={() => router.replace('/(tabs)')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: 24, paddingBottom: 20 },
  eyebrow: { fontFamily: fonts.semibold, fontSize: 12, letterSpacing: 1.2, color: colors.textTertiary },
  title: { fontFamily: fonts.displayBold, fontSize: 30, lineHeight: 36, color: colors.textPrimary, marginTop: 8 },
  lead: { fontFamily: fonts.body, fontSize: 15, lineHeight: 23, color: colors.textSecondary, marginTop: 12, marginBottom: 24 },
  permCard: { flexDirection: 'row', alignItems: 'center', padding: 16, marginBottom: 16 },
  iconTile: { width: 48, height: 48, borderRadius: radius.tile, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  permTitle: { fontFamily: fonts.semibold, fontSize: 16, color: colors.textPrimary },
  permBody: { fontFamily: fonts.body, fontSize: 13, lineHeight: 18, color: colors.textSecondary, marginTop: 3, paddingRight: 8 },
  allowBtn: { height: 40, paddingHorizontal: 16 },
  reassure: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginTop: 6, paddingHorizontal: 4 },
  reassureText: { flex: 1, fontFamily: fonts.body, fontSize: 12, lineHeight: 17, color: colors.textTertiary },
  footer: { paddingHorizontal: 24, paddingTop: 8 },
});
