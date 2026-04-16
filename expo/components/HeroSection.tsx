import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  useWindowDimensions,
  Pressable,
  Linking,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronDown, Smartphone, ArrowRight } from 'lucide-react-native';
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
  const fadeSubtitle = useRef(new Animated.Value(0)).current;
  const fadeCTA = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(50)).current;
  const slideUpSub = useRef(new Animated.Value(30)).current;
  const chevronBounce = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(1.1)).current;
  const badgeSlide = useRef(new Animated.Value(-20)).current;
  const statsFade = useRef(new Animated.Value(0)).current;
  const decorPulse = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.timing(imageScale, { toValue: 1, duration: 1200, useNativeDriver: true }).start();

    Animated.stagger(180, [
      Animated.parallel([
        Animated.timing(badgeSlide, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(fadeTitle, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(fadeTitle, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(slideUp, { toValue: 0, duration: 700, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(fadeSubtitle, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(slideUpSub, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]),
      Animated.timing(fadeCTA, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(statsFade, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(chevronBounce, { toValue: 12, duration: 1200, useNativeDriver: true }),
        Animated.timing(chevronBounce, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(decorPulse, { toValue: 0.6, duration: 3000, useNativeDriver: true }),
        Animated.timing(decorPulse, { toValue: 0.3, duration: 3000, useNativeDriver: true }),
      ])
    ).start();
  }, [fadeTitle, fadeSubtitle, fadeCTA, slideUp, slideUpSub, chevronBounce, imageScale, badgeSlide, statsFade, decorPulse]);

  const heroHeight = Math.max(height * 0.94, 720);
  const isSmall = width < 400;

  return (
    <View style={[styles.container, { height: heroHeight }]}>
      <Animated.View style={[StyleSheet.absoluteFillObject, { transform: [{ scale: imageScale }] }]}>
        <Image
          source={{ uri: images.hero }}
          style={StyleSheet.absoluteFillObject}
          contentFit="cover"
          transition={600}
        />
      </Animated.View>

      <LinearGradient
        colors={['rgba(247,245,242,0.15)', 'rgba(247,245,242,0.4)', 'rgba(247,245,242,0.85)', '#F7F5F2']}
        locations={[0, 0.3, 0.6, 0.88]}
        style={StyleSheet.absoluteFillObject}
      />

      <Animated.View style={[styles.decorCircle1, { opacity: decorPulse }]} />
      <Animated.View style={[styles.decorCircle2, { opacity: decorPulse }]} />

      <View style={[styles.content, isRTL && styles.contentRTL]}>
        <Animated.View style={[styles.badge, { alignSelf, flexDirection, opacity: fadeTitle, transform: [{ translateX: badgeSlide }] }]}>
          <View style={styles.badgeDot} />
          <Text style={[styles.badgeText, { writingDirection }]}>{t.hero.badge}</Text>
        </Animated.View>

        <Animated.View style={{ opacity: fadeTitle, transform: [{ translateY: slideUp }] }}>
          <Text style={[styles.title, isSmall && styles.titleSmall, { textAlign, writingDirection }]}>
            {t.hero.titleLine1}{'\n'}{t.hero.titleLine2}{'\n'}
            <Text style={styles.titleAccent}>{t.hero.titleAccent}</Text>
          </Text>
        </Animated.View>

        <Animated.Text style={[styles.subtitle, { opacity: fadeSubtitle, textAlign, writingDirection, transform: [{ translateY: slideUpSub }] }]}>
          {t.hero.subtitle}
        </Animated.Text>

        <Animated.View style={[styles.ctaRow, { opacity: fadeCTA, flexDirection }]}>
          <Pressable
            style={({ pressed }) => [styles.ctaPrimary, pressed && styles.ctaPressed]}
            onPress={() => Linking.openURL('https://rork.com/p/h5yitrrxv4e3qreqccuca')}
          >
            <Smartphone size={18} color="#FFFFFF" strokeWidth={2.5} />
            <Text style={styles.ctaPrimaryText}>{t.hero.ctaPrimary}</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.ctaSecondary, pressed && styles.ctaSecondaryPressed]}
            onPress={onScrollToFeatures}
          >
            <Text style={styles.ctaSecondaryText}>{t.hero.ctaSecondary}</Text>
            <ArrowRight size={16} color={Colors.primary} strokeWidth={2.5} />
          </Pressable>
        </Animated.View>

        <Animated.View style={[styles.statsRow, { flexDirection, opacity: statsFade }]}>
          {[
            { value: '2M+', label: t.hero.statRides },
            { value: '50K+', label: t.hero.statDrivers },
            { value: '12', label: t.hero.statCities },
          ].map((stat, i) => (
            <View key={i} style={[styles.statItem, i < 2 && styles.statDivider]}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={[styles.statLabel, { writingDirection }]}>{stat.label}</Text>
            </View>
          ))}
        </Animated.View>
      </View>

      <Animated.View style={[styles.scrollHint, { transform: [{ translateY: chevronBounce }] }]}>
        <Pressable onPress={onScrollToFeatures} hitSlop={20} style={styles.scrollHintBtn}>
          <ChevronDown size={22} color={Colors.primary} strokeWidth={2.5} />
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
  decorCircle1: {
    position: 'absolute' as const,
    bottom: '30%',
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(232,105,46,0.08)',
  },
  decorCircle2: {
    position: 'absolute' as const,
    bottom: '15%',
    left: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(27,158,140,0.06)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end' as const,
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  contentRTL: {
    alignItems: 'flex-end' as const,
  },
  badge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    alignSelf: 'flex-start' as const,
    backgroundColor: 'rgba(232,105,46,0.1)',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(232,105,46,0.15)',
  },
  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginRight: 9,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700' as const,
    color: Colors.primary,
    letterSpacing: 1.2,
    textTransform: 'uppercase' as const,
  },
  title: {
    fontSize: 48,
    fontWeight: '900' as const,
    color: Colors.text,
    lineHeight: 54,
    letterSpacing: -1.8,
  },
  titleSmall: {
    fontSize: 38,
    lineHeight: 44,
  },
  titleAccent: {
    color: Colors.primary,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 25,
    marginTop: 18,
    maxWidth: 340,
  },
  ctaRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 14,
    marginTop: 30,
  },
  ctaPrimary: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 26,
    borderRadius: 18,
    gap: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  ctaPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.97 }],
  },
  ctaPrimaryText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  ctaSecondary: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 18,
    gap: 8,
    backgroundColor: 'rgba(232,105,46,0.08)',
  },
  ctaSecondaryPressed: {
    backgroundColor: 'rgba(232,105,46,0.14)',
  },
  ctaSecondaryText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.primary,
    letterSpacing: 0.2,
  },
  statsRow: {
    flexDirection: 'row' as const,
    marginTop: 40,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(232,105,46,0.08)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center' as const,
  },
  statDivider: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(28,25,23,0.08)',
  },
  statValue: {
    fontSize: 26,
    fontWeight: '900' as const,
    color: Colors.text,
    letterSpacing: -0.8,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 3,
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: 1.2,
  },
  scrollHint: {
    position: 'absolute' as const,
    bottom: 20,
    alignSelf: 'center' as const,
  },
  scrollHintBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
});
