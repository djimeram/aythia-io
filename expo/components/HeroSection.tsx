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
import { ChevronDown, ArrowRight, Download, Sparkles } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { getImages } from '@/constants/images';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeroSectionProps {
  onScrollToFeatures: () => void;
  scrollY: Animated.Value;
}

export default function HeroSection({ onScrollToFeatures, scrollY }: HeroSectionProps) {
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
  const imageScale = useRef(new Animated.Value(1.15)).current;
  const chevronY = useRef(new Animated.Value(0)).current;
  const badgeFade = useRef(new Animated.Value(0)).current;
  const badgeScale = useRef(new Animated.Value(0.9)).current;
  const shimmerX = useRef(new Animated.Value(0)).current;
  const ctaPulse = useRef(new Animated.Value(0)).current;
  const dotPulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(imageScale, { toValue: 1, duration: 1800, useNativeDriver: true }).start();

    Animated.stagger(140, [
      Animated.parallel([
        Animated.timing(badgeFade, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(badgeScale, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(fadeTitle, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.spring(slideTitle, { toValue: 0, tension: 40, friction: 10, useNativeDriver: true }),
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
        Animated.timing(chevronY, { toValue: 8, duration: 1100, useNativeDriver: true }),
        Animated.timing(chevronY, { toValue: 0, duration: 1100, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(shimmerX, { toValue: 1, duration: 4500, useNativeDriver: true })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(ctaPulse, { toValue: 1, duration: 1800, useNativeDriver: true }),
        Animated.timing(ctaPulse, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(dotPulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(dotPulse, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, [fadeTitle, fadeSub, fadeCta, fadeStats, slideTitle, slideSub, slideCta, imageScale, chevronY, badgeFade, badgeScale, shimmerX, ctaPulse, dotPulse]);

  const heroH = Math.max(height * 0.96, 720);

  const parallaxY = scrollY.interpolate({
    inputRange: [0, heroH],
    outputRange: [0, heroH * 0.4],
    extrapolate: 'clamp',
  });

  const parallaxOpacity = scrollY.interpolate({
    inputRange: [0, heroH * 0.7],
    outputRange: [1, 0.2],
    extrapolate: 'clamp',
  });

  const ctaScale = ctaPulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.04] });
  const ctaGlow = ctaPulse.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0.8] });
  const dotScale = dotPulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.6] });
  const dotOp = dotPulse.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });

  return (
    <View style={[styles.container, { height: heroH }]}>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          { opacity: parallaxOpacity, transform: [{ translateY: parallaxY }] },
        ]}
      >
        <Animated.View style={[StyleSheet.absoluteFillObject, { transform: [{ scale: imageScale }] }]}>
          <Image
            source={{ uri: images.hero }}
            style={[StyleSheet.absoluteFillObject, { opacity: 0.5 }]}
            contentFit="cover"
            transition={500}
          />
        </Animated.View>
      </Animated.View>

      <LinearGradient
        colors={['rgba(6,6,15,0.6)', 'rgba(6,6,15,0.3)', 'rgba(6,6,15,0.85)', '#06060F']}
        locations={[0, 0.4, 0.85, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={[styles.content, isRTL && styles.contentRTL]}>
        <Animated.View
          style={[
            styles.badgeWrap,
            { alignSelf, opacity: badgeFade, transform: [{ scale: badgeScale }] },
          ]}
        >
          <View style={[styles.badge, { flexDirection }]}>
            <View style={styles.badgeBg} />
            <View style={styles.dotWrap}>
              <Animated.View style={[styles.dotPulse, { transform: [{ scale: dotScale }], opacity: dotOp }]} />
              <View style={styles.dotCore} />
            </View>
            <Text style={[styles.badgeText, { writingDirection }]}>{t.hero.badge}</Text>
            <Sparkles size={11} color={Colors.gold} strokeWidth={2.5} />
          </View>
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
          <Animated.View
            style={{
              transform: [{ scale: ctaScale }],
              shadowColor: '#8B5CF6',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: ctaGlow,
              shadowRadius: 28,
            }}
          >
            <Pressable
              style={({ pressed }) => [styles.ctaPrimary, pressed && styles.ctaPress]}
              onPress={() => Linking.openURL('https://rork.com/p/h5yitrrxv4e3qreqccuca')}
            >
              <LinearGradient
                colors={['#8B5CF6', '#6366F1', '#22D3EE']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFillObject}
              />
              <Download size={17} color="#FFF" strokeWidth={2.5} />
              <Text style={styles.ctaPrimaryTxt}>{t.hero.ctaPrimary}</Text>
            </Pressable>
          </Animated.View>

          <Pressable
            style={({ pressed }) => [styles.ctaSecondary, pressed && styles.ctaSecondaryPress]}
            onPress={onScrollToFeatures}
          >
            <View style={styles.ctaSecondaryBg} />
            <Text style={styles.ctaSecondaryTxt}>{t.hero.ctaSecondary}</Text>
            <ArrowRight size={15} color="#FFF" strokeWidth={2.5} />
          </Pressable>
        </Animated.View>

        <Animated.View style={[styles.statsBar, { flexDirection, opacity: fadeStats }]}>
          <View style={styles.statsBg} />
          {[
            { val: '2M+', label: t.hero.statRides, color: Colors.violet },
            { val: '50K+', label: t.hero.statDrivers, color: Colors.cyan },
            { val: '12', label: t.hero.statCities, color: Colors.magenta },
          ].map((s, i) => (
            <React.Fragment key={i}>
              <View style={styles.statCell}>
                <Text style={[styles.statVal, { color: s.color }]}>{s.val}</Text>
                <Text style={[styles.statLbl, { writingDirection }]}>{s.label}</Text>
              </View>
              {i < 2 && <View style={styles.statDivider} />}
            </React.Fragment>
          ))}
        </Animated.View>
      </View>

      <Animated.View style={[styles.scrollArrow, { transform: [{ translateY: chevronY }] }]}>
        <Pressable onPress={onScrollToFeatures} hitSlop={20} style={styles.scrollBtn}>
          <ChevronDown size={20} color="#FFF" strokeWidth={2.5} />
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
  content: {
    flex: 1,
    justifyContent: 'flex-end' as const,
    paddingHorizontal: 24,
    paddingBottom: 88,
  },
  contentRTL: {
    alignItems: 'flex-end' as const,
  },
  badgeWrap: {
    marginBottom: 22,
  },
  badge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    gap: 9,
    overflow: 'hidden' as const,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  badgeBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.06)',
    ...(Platform.OS === 'web' ? ({ backdropFilter: 'blur(20px)' } as object) : {}),
  },
  dotWrap: {
    width: 10,
    height: 10,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  dotPulse: {
    position: 'absolute' as const,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.emerald,
  },
  dotCore: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.emerald,
  },
  badgeText: {
    fontSize: 10.5,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    letterSpacing: 1.6,
    textTransform: 'uppercase' as const,
  },
  title: {
    fontSize: 56,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    lineHeight: 60,
    letterSpacing: -2,
  },
  titleSm: {
    fontSize: 42,
    lineHeight: 46,
  },
  titleAccent: {
    color: '#A78BFA',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 26,
    marginTop: 18,
    maxWidth: 380,
    fontWeight: '400' as const,
  },
  ctaRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 12,
    marginTop: 32,
    flexWrap: 'wrap' as const,
  },
  ctaPrimary: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 16,
    paddingHorizontal: 26,
    borderRadius: 999,
    gap: 10,
    overflow: 'hidden' as const,
  },
  ctaPress: {
    opacity: 0.92,
    transform: [{ scale: 0.97 }],
  },
  ctaPrimaryTxt: {
    fontSize: 15,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  ctaSecondary: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 999,
    gap: 8,
    overflow: 'hidden' as const,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  ctaSecondaryBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.06)',
    ...(Platform.OS === 'web' ? ({ backdropFilter: 'blur(20px)' } as object) : {}),
  },
  ctaSecondaryPress: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  ctaSecondaryTxt: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  statsBar: {
    flexDirection: 'row' as const,
    marginTop: 40,
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 12,
    overflow: 'hidden' as const,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center' as const,
  },
  statsBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.04)',
    ...(Platform.OS === 'web' ? ({ backdropFilter: 'blur(24px) saturate(180%)' } as object) : {}),
  },
  statCell: {
    flex: 1,
    alignItems: 'center' as const,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  statVal: {
    fontSize: 28,
    fontWeight: '900' as const,
    letterSpacing: -1,
  },
  statLbl: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 4,
    fontWeight: '700' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: 1.5,
  },
  scrollArrow: {
    position: 'absolute' as const,
    bottom: 24,
    alignSelf: 'center' as const,
  },
  scrollBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    ...(Platform.OS === 'web' ? ({ backdropFilter: 'blur(16px)' } as object) : {}),
  },
});
