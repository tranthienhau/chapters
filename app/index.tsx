import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../src/ui';
import { colors, fonts } from '../src/theme';
import { photos } from '../src/photos';

const { width } = Dimensions.get('window');

export default function Welcome() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <LinearGradient colors={['#EAC9B8', '#E9D6C6', '#DCDECE']} style={[styles.hero, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.brand}>CHAPTERS</Text>
        <View style={styles.bookWrap}>
          <View style={styles.bookShadow} />
          <Image source={photos.amalfi} style={styles.book} />
          <View style={styles.spine} />
        </View>
      </LinearGradient>

      <View style={[styles.body, { paddingBottom: insets.bottom + 24 }]}>
        <Text style={styles.headline}>Your trips,{'\n'}already a book</Text>
        <Text style={styles.sub}>
          Chapters turns your camera roll into a beautiful photobook, automatically, right when you get home.
        </Text>

        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <Button label="Get started" onPress={() => router.push('/permissions')} />
        <Text style={styles.signin} onPress={() => router.replace('/(tabs)')}>
          I already have an account
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  hero: { height: '52%', alignItems: 'center' },
  brand: { fontFamily: fonts.semibold, fontSize: 13, letterSpacing: 4, color: colors.accentDark, opacity: 0.7 },
  bookWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bookShadow: {
    position: 'absolute',
    width: width * 0.52,
    height: width * 0.68,
    borderRadius: 12,
    backgroundColor: '#2B2622',
    opacity: 0.18,
    transform: [{ rotate: '-6deg' }, { translateY: 16 }],
  },
  book: {
    width: width * 0.52,
    height: width * 0.68,
    borderRadius: 10,
    transform: [{ rotate: '-6deg' }],
    borderWidth: 6,
    borderColor: '#FFFDF9',
  },
  spine: {
    position: 'absolute',
    left: width * 0.22,
    width: 10,
    height: width * 0.66,
    backgroundColor: 'rgba(43,38,34,0.10)',
    transform: [{ rotate: '-6deg' }],
    borderRadius: 4,
  },
  body: { flex: 1, paddingHorizontal: 28, paddingTop: 30 },
  headline: { fontFamily: fonts.displayBold, fontSize: 34, lineHeight: 40, color: colors.textPrimary },
  sub: { fontFamily: fonts.body, fontSize: 15, lineHeight: 23, color: colors.textSecondary, marginTop: 14 },
  dots: { flexDirection: 'row', marginTop: 22, marginBottom: 22 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.hairline, marginRight: 7 },
  dotActive: { width: 22, backgroundColor: colors.accent },
  signin: { fontFamily: fonts.semibold, fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginTop: 16 },
});
