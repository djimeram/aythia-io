import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  useWindowDimensions,
  Pressable,
  Linking,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronDown, ArrowRight, Download } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { getImages } from '@/constants/images';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeroSectionProps {
  onScrollToFeatures: () => void;
}

export default function HeroSection({ onScrollToFeatures }: HeroSectionProps) {
  const { width, height } = useWindowDimensions();
  const { t, language, isRTL, textAlign, flexDirection, alignSelf, writingDirection } = useLanguage();
  const images = getImages(language);

  const fadeTitle = useRef(new Animated.Value(0)).current;
  const fadeSub = useRef(new Animated.Value(0)).current;
  const fadeCta = useRef(new Animated.Value(0)).current;
  const fadeStats = useRef(new Animated.Value(0)).current;
  const slideTitle = useRef(new Animated.Value(40)).current;
  const slideSub = useRef(new Animated.Value(25)).current;
  const slideCta = useRef(new Animated.Value(20)).current;
  const imageScale = useRef(new Animated.Value(1.08)).current;
  const chevronY = useRef(new Animated.Value(0)).current;
  const badgeFade = useRef(new Animated.Value(0)).current;
  const badgeScale = useRef(new Animated.Value(0.9)).current;
  const pulseOrb = useRef(new Animated.Value(0.15)).current;

  useEffect(() => {
    Animated.timing(imageScale, { toValue: 1, duration: 1400, useNativeDriver: true }).start();

    Animated.stagger(150, [
      Animated.parallel([
        Animated.timing(badgeFade, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(badgeScale, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(fadeTitle, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.spring(slideTitle, { toValue: 0, tension: 40, friction: 9, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(fadeSub, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(slideSub, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(fadeCta, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(slideCta, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
      Animated.timing(fadeStats, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(chevronY, { toValue: 10, duration: 1100, useNativeDriver: true }),
        Animated.timing(chevronY, { toValue: 0, duration: 1100, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseOrb, { toValue: 0.35, duration: 3500, useNativeDriver: true }),
        Animated.timing(pulseOrb, { toValue: 0.15, duration: 3500, useNativeDriver: true }),
      ])
    ).start();
  }, [fadeTitle, fadeSub, fadeCta, fadeStats, slideTitle, slideSub, slideCta, imageScale, chevronY, badgeFade, badgeScale, pulseOrb]);

  const heroH = Math.max(height * 0.92, 700);

  return (
    <View style={[styles.container, { height: heroH }]}>
      <Animated.View style={[StyleSheet.absoluteFillObject, { transform: [{ scale: imageScale }] }]}>
        <Image
          source={{ uri: images.hero }}
          style={StyleSheet.absoluteFillObject}
          contentFit="cover"
          transition={500}
        />
      </Animated.View>

      <LinearGradient
        colors={['rgba(250,250,249,0.05)', 'rgba(250,250,249,0.25)', 'rgba(250,250,249,0.75)', 'rgba(250,250,249,0.95)', '#FAFAF9']}
        locations={[0, 0.2, 0.5, 0.72, 0.92]}
        style={StyleSheet.absoluteFillObject}
      />

      <Animated.View style={[styles.orb1, { opacity: pulseOrb }]} />
      <Animated.View style={[styles.orb2, { opacity: pulseOrb }]} />

      <View style={[styles.content, isRTL && styles.contentRTL]}>
        <Animated.View
          style={[
            styles.badge,
            { alignSelf, flexDirection, opacity: badgeFade, transform: [{ scale: badgeScale }] },
          ]}
        >
          <View style={styles.badgePulse} />
          <Text style={[styles.badgeText, { writingDirection }]}>{t.hero.badge}</Text>
        </Animated.View>

        <Animated.View style={{ opacity: fadeTitle, transform: [{ translateY: slideTitle }] }}>
          <Text style={[styles.title, width < 400 && styles.titleSm, { textAlign, writingDirection }]}>
            {t.hero.titleLine1}{'\n'}
            {t.hero.titleLine2}{' '}
            <Text style={styles.titleAccent}>{t.hero.titleAccent}</Text>
          </Text>
        </Animated.View>

        <Animated.Text
          style={[
            styles.subtitle,
            { textAlign, writingDirection, opacity: fadeSub, transform: [{ translateY: slideSub }] },
          ]}
        >
          {t.hero.subtitle}
        </Animated.Text>

        <Animated.View
          style={[styles.ctaRow, { flexDirection, opacity: fadeCta, transform: [{ translateY: slideCta }] }]}
        >
          <Pressable
            style={({ pressed }) => [styles.ctaPrimary, pressed && styles.ctaPress]}
            onPress={() => Linking.openURL('https://rork.com/p/h5yitrrxv4e3qreqccuca')}
          >
            <Download size={17} color="#FFF" strokeWidth={2.5} />
            <Text style={styles.ctaPrimaryTxt}>{t.hero.ctaPrimary}</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.ctaSecondary, pressed && styles.ctaSecondaryPress]}
            onPress={onScrollToFeatures}
          >
            <Text style={styles.ctaSecondaryTxt}>{t.hero.ctaSecondary}</Text>
            <ArrowRight size={15} color={Colors.primary} strokeWidth={2.5} />
          </Pressable>
        </Animated.View>

        <Animated.View style={[styles.statsBar, { flexDirection, opacity: fadeStats }]}>
          {[
            { val: '2M+', label: t.hero.statRides },
            { val: '50K+', label: t.hero.statDrivers },
            { val: '12', label: t.hero.statCities },
          ].map((s, i) => (
            <View key={i} style={styles.statCell}>
              <Text style={styles.statVal}>{s.val}</Text>
              <Text style={[styles.statLbl, { writingDirection }]}>{s.label}</Text>
            </View>
          ))}
        </Animated.View>
      </View>

      <Animated.View style={[styles.scrollArrow, { transform: [{ translateY: chevronY }] }]}>
        <Pressable onPress={onScrollToFeatures} hitSlop={20} style={styles.scrollBtn}>
          <ChevronDown size={20} color={Colors.primary} strokeWidth={2.5} />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative' as const,
    overflow: 'hidden' as const,
  },
  orb1: {
    position: 'absolute' as const,
    bottom: '25%',
    right: -80,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(232,105,46,0.15)',
  },
  orb2: {
    position: 'absolute' as const,
    bottom: '12%',
    left: -60,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(13,148,136,0.1)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end' as const,
    paddingHorizontal: 24,
    paddingBottom: 72,
  },
  contentRTL: {
    alignItems: 'flex-end' as const,
  },
  badge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    alignSelf: 'flex-start' as const,
    backgroundColor: 'rgba(232,105,46,0.08)',
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 20,
    gap: 9,
    borderWidth: 1,
    borderColor: 'rgba(232,105,46,0.12)',
  },
  badgePulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700' as const,
    color: Colors.primary,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
  },
  title: {
    fontSize: 46,
    fontWeight: '900' as const,
    color: Colors.text,
    lineHeight: 52,
    letterSpacing: -1.5,
  },
  titleSm: {
    fontSize: 36,
    lineHeight: 42,
  },
  titleAccent: {
    color: Colors.primary,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 26,
    marginTop: 16,
    maxWidth: 360,
  },
  ctaRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 12,
    marginTop: 28,
  },
  ctaPrimary: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 9,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  ctaPress: {
    opacity: 0.92,
    transform: [{ scale: 0.97 }],
  },
  ctaPrimaryTxt: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: '#FFF',
    letterSpacing: 0.2,
  },
  ctaSecondary: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 16,
    gap: 7,
    backgroundColor: 'rgba(232,105,46,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(232,105,46,0.1)',
  },
  ctaSecondaryPress: {
    backgroundColor: 'rgba(232,105,46,0.12)',
  },
  ctaSecondaryTxt: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  statsBar: {
    flexDirection: 'row' as const,
    marginTop: 36,
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(12px)' } : {}),
  },
  statCell: {
    flex: 1,
    alignItems: 'center' as const,
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,0.06)',
  },
  statVal: {
    fontSize: 26,
    fontWeight: '900' as const,
    color: Colors.text,
    letterSpacing: -0.8,
  },
  statLbl: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 3,
    fontWeight: '700' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: 1.5,
  },
  scrollArrow: {
    position: 'absolute' as const,
    bottom: 18,
    alignSelf: 'center' as const,
  },
  scrollBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
});
