import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../src/ui';
import { colors, fonts } from '../src/theme';
import { photos } from '../src/photos';

const { width } = Dimensions.get('window');

export default function WelcomeHome() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient colors={['#EAC7B4', '#E7D2C1', '#D7DCCB']} style={styles.root}>
      <View style={[styles.inner, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 24 }]}>
        <View style={styles.bookWrap}>
          <View style={styles.bookShadow} />
          <Image source={photos.positano} style={styles.book} />
        </View>

        <Text style={styles.kicker}>DRAFT READY</Text>
        <Text style={styles.title}>Welcome home{'\n'}from Italy</Text>
        <Text style={styles.body}>
          While you were away we picked your 42 best photos and laid out a draft book.
        </Text>
        <Text style={styles.caption}>Rome  -  Florence  -  Amalfi</Text>

        <View style={styles.actions}>
          <Button label="Review my book" onPress={() => router.replace({ pathname: '/preview', params: { id: 'italy' } })} />
          <Button label="Maybe later" variant="secondary" onPress={() => router.replace('/(tabs)')} style={{ marginTop: 12 }} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  inner: { flex: 1, alignItems: 'center', paddingHorizontal: 28 },
  bookWrap: { alignItems: 'center', justifyContent: 'center', marginBottom: 34, marginTop: 8 },
  bookShadow: {
    position: 'absolute',
    width: width * 0.5,
    height: width * 0.64,
    borderRadius: 12,
    backgroundColor: '#2B2622',
    opacity: 0.2,
    transform: [{ rotate: '4deg' }, { translateY: 18 }],
  },
  book: {
    width: width * 0.5,
    height: width * 0.64,
    borderRadius: 10,
    transform: [{ rotate: '4deg' }],
    borderWidth: 7,
    borderColor: '#FFFDF9',
  },
  kicker: { fontFamily: fonts.semibold, fontSize: 12, letterSpacing: 2, color: colors.accentDark },
  title: { fontFamily: fonts.displayBold, fontSize: 34, lineHeight: 40, color: colors.textPrimary, textAlign: 'center', marginTop: 10 },
  body: { fontFamily: fonts.body, fontSize: 15, lineHeight: 23, color: '#57503F', textAlign: 'center', marginTop: 14, paddingHorizontal: 8 },
  caption: { fontFamily: fonts.medium, fontSize: 13, color: colors.textSecondary, marginTop: 14, letterSpacing: 0.5 },
  actions: { alignSelf: 'stretch', marginTop: 'auto' },
});
