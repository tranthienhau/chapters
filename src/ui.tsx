// Shared UI primitives - button, chip, pill, screen header, status badge.
import React from 'react';
import {
  Text,
  TextProps,
  Pressable,
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, fonts, shadow } from './theme';

export function T(props: TextProps & { children: React.ReactNode }) {
  return <Text {...props} />;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  style,
  icon,
}: {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  const primary = variant === 'primary';
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        primary ? styles.btnPrimary : styles.btnSecondary,
        pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
        style,
      ]}
    >
      {icon && (
        <Ionicons name={icon} size={18} color={primary ? colors.white : colors.textPrimary} style={{ marginRight: 8 }} />
      )}
      <Text style={[styles.btnLabel, { color: primary ? colors.white : colors.textPrimary }]}>{label}</Text>
    </Pressable>
  );
}

export function Chip({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active ? styles.chipActive : styles.chipIdle]}
    >
      <Text style={[styles.chipLabel, { color: active ? colors.accent : colors.textSecondary }]}>{label}</Text>
    </Pressable>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = { draft: colors.accent, ordered: colors.support, shipped: colors.support };
  const c = map[status] ?? colors.accent;
  return (
    <View style={[styles.badge, { backgroundColor: c + '22' }]}>
      <View style={[styles.dot, { backgroundColor: c }]} />
      <Text style={[styles.badgeLabel, { color: c }]}>{status[0].toUpperCase() + status.slice(1)}</Text>
    </View>
  );
}

export function Card({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function GradientHeader({ children, style }: { children?: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return (
    <LinearGradient
      colors={['#E9C7B6', '#E7D4C4', '#D9DDCD']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
}

export function ScreenTitle({ title, subtitle, style }: { title: string; subtitle?: string; style?: StyleProp<TextStyle> }) {
  return (
    <View style={{ marginBottom: 6 }}>
      {subtitle && <Text style={styles.eyebrow}>{subtitle}</Text>}
      <Text style={[styles.screenTitle, style]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 52,
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  btnPrimary: { backgroundColor: colors.accent, ...shadow.soft },
  btnSecondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.hairline },
  btnLabel: { fontFamily: fonts.semibold, fontSize: 16 },
  chip: { paddingHorizontal: 16, height: 38, borderRadius: radius.chip, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  chipActive: { backgroundColor: colors.accentTint },
  chipIdle: { backgroundColor: colors.surfaceAlt },
  chipLabel: { fontFamily: fonts.semibold, fontSize: 13 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, height: 26, borderRadius: radius.chip },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  badgeLabel: { fontFamily: fonts.semibold, fontSize: 12 },
  card: { backgroundColor: colors.surface, borderRadius: radius.card, ...shadow.card },
  eyebrow: { fontFamily: fonts.semibold, fontSize: 12, letterSpacing: 1.2, color: colors.textTertiary, textTransform: 'uppercase' },
  screenTitle: { fontFamily: fonts.displayBold, fontSize: 32, color: colors.textPrimary },
});
