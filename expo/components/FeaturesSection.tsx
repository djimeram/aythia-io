import React, { useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Animated, useWindowDimensions, Platform, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Shield, Zap, MapPin, CreditCard, Star } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useLanguage } from '@/contexts/LanguageContext';

const FEATURE_THEMES = [
  { color: '#8B5CF6', glow: 'rgba(139,92,246,0.5)', from: '#8B5CF6', to: '#6366F1' },
  { color: '#22D3EE', glow: 'rgba(34,211,238,0.5)', from: '#22D3EE', to: '#0EA5E9' },
  { color: '#EC4899', glow: 'rgba(236,72,153,0.5)', from: '#EC4899', to: '#DB2777' },
  { color: '#FCD34D', glow: 'rgba(252,211,77,0.5)', from: '#FCD34D', to: '#F59E0B' },
  { color: '#34D399', glow: 'rgba(52,211,153,0.5)', from: '#34D399', to: '#10B981' },
] as const;

function FeatureCard({
  Icon,
  title,
  desc,
  theme,
  width: cardW,
  anim,
  isRTL,
  textAlign,
  writingDirection,
  alignSelf,
}: {
  Icon: typeof Shield;
  title: string;
  desc: string;
  theme: typeof FEATURE_THEMES[number];
  width: number;
  anim: Animated.Value;
  isRTL: boolean;
  textAlign: 'left' | 'right';
  writingDirection: 'ltr' | 'rtl';
  alignSelf: 'flex-start' | 'flex-end';
}) {
  const hover = useRef(new Animated.Value(0)).current;

  const onIn = () =>
    Animated.spring(hover, { toValue: 1, tension: 80, friction: 10, useNativeDriver: false }).start();
  const onOut = () =>
    Animated.spring(hover, { toValue: 0, tension: 80, friction: 10, useNativeDriver: false }).start();

  const lift = hover.interpolate({ inputRange: [0, 1], outputRange: [0, -6] });
  const borderOp = hover.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  return (
    <Animated.View
      style={[
        styles.card,
        {
          width: cardW,
          opacity: anim,
          transform: [
            { translateY: Animated.add(anim.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }), lift) },
            { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1] }) },
          ],
        },
        isRTL && { alignItems: 'flex-end' as const },
      ]}
    >
      <Pressable onHoverIn={onIn} onHoverOut={onOut} style={styles.cardPress}>
        <View style={styles.cardBg} />
        <Animated.View
          style={[styles.cardBorder, { opacity: borderOp, shadowColor: theme.glow }]}
          pointerEvents="none"
        >
          <LinearGradient
            colors={[theme.from + 'aa', theme.to + 'aa', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View>

        <View style={[styles.iconCircle, { alignSelf, shadowColor: theme.color }]}>
          <LinearGradient
            colors={[theme.from, theme.to]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
          <Icon size={22} color="#FFF" strokeWidth={2.4} />
        </View>

        <Text style={[styles.cardTitle, { textAlign, writingDirection }]}>{title}</Text>
        <Text style={[styles.cardDesc, { textAlign, writingDirection }]}>{desc}</Text>

        <View style={[styles.cornerGlow, { backgroundColor: theme.color }]} />
      </Pressable>
    </Animated.View>
  );
}

export default function FeaturesSection() {
  const { width } = useWindowDimensions();
  const { t, isRTL, textAlign, writingDirection, flexDirection, alignSelf } = useLanguage();
  const anims = useRef([0, 1, 2, 3, 4].map(() => new Animated.Value(0))).current;
  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(24)).current;

  const features = useMemo(() => [
    { icon: Shield, title: t.features.safetyTitle, desc: t.features.safetyDesc, theme: FEATURE_THEMES[0] },
    { icon: Zap, title: t.features.matchingTitle, desc: t.features.matchingDesc, theme: FEATURE_THEMES[1] },
    { icon: MapPin, title: t.features.trackingTitle, desc: t.features.trackingDesc, theme: FEATURE_THEMES[2] },
    { icon: CreditCard, title: t.features.paymentTitle, desc: t.features.paymentDesc, theme: FEATURE_THEMES[3] },
    { icon: Star, title: t.features.ratedTitle, desc: t.features.ratedDesc, theme: FEATURE_THEMES[4] },
  ], [t]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(headerSlide, { toValue: 0, tension: 40, friction: 10, useNativeDriver: true }),
    ]).start();

    Animated.stagger(
      90,
      anims.map((a) =>
        Animated.spring(a, { toValue: 1, tension: 50, friction: 9, useNativeDriver: true })
      )
    ).start();
  }, [anims, headerFade, headerSlide]);

  const isWide = width > 720;
  const isMid = width > 500;
  const cardW = isWide ? (Math.min(width, 1100) - 96) / 3 : isMid ? (width - 60) / 2 : width - 48;

  return (
    <View style={styles.container} nativeID="features">
      <Animated.View
        style={[
          styles.header,
          isRTL && { alignItems: 'flex-end' as const },
          { opacity: headerFade, transform: [{ translateY: headerSlide }] },
        ]}
      >
        <View style={[styles.eyebrowRow, { alignSelf, flexDirection }]}>
          <View style={styles.eyebrowDot} />
          <Text style={[styles.eyebrow, { writingDirection }]}>{t.features.eyebrow}</Text>
        </View>
        <Text style={[styles.heading, { textAlign, writingDirection }]}>{t.features.heading}</Text>
        <Text style={[styles.subheading, { textAlign, writingDirection }]}>{t.features.subheading}</Text>
      </Animated.View>

      <View style={[styles.grid, isMid && styles.gridWide, { maxWidth: 1100, alignSelf: 'center' as const }]}>
        {features.map((feat, idx) => (
          <FeatureCard
            key={idx}
            Icon={feat.icon}
            title={feat.title}
            desc={feat.desc}
            theme={feat.theme}
            width={cardW}
            anim={anims[idx]}
            isRTL={isRTL}
            textAlign={textAlign}
            writingDirection={writingDirection}
            alignSelf={alignSelf}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 100,
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 56,
    maxWidth: 1100,
    alignSelf: 'center' as const,
    width: '100%',
  },
  eyebrowRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
    marginBottom: 16,
  },
  eyebrowDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.violet,
    shadowColor: Colors.violet,
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800' as const,
    color: '#A78BFA',
    letterSpacing: 2.8,
  },
  heading: {
    fontSize: 48,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    lineHeight: 52,
    letterSpacing: -1.6,
  },
  subheading: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 26,
    marginTop: 16,
    maxWidth: 480,
  },
  grid: {
    gap: 16,
    width: '100%',
  },
  gridWide: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
  },
  card: {
    borderRadius: 24,
    overflow: 'hidden' as const,
    position: 'relative' as const,
  },
  cardPress: {
    padding: 24,
    borderRadius: 24,
    overflow: 'hidden' as const,
    minHeight: 200,
  },
  cardBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20,20,40,0.5)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    ...(Platform.OS === 'web'
      ? ({ backdropFilter: 'blur(20px) saturate(180%)' } as object)
      : {}),
  },
  cardBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
    padding: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 30,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: 18,
    overflow: 'hidden' as const,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: '800' as const,
    marginBottom: 8,
    letterSpacing: -0.4,
    color: '#FFFFFF',
  },
  cardDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 22,
  },
  cornerGlow: {
    position: 'absolute' as const,
    top: -40,
    right: -40,
    width: 100,
    height: 100,
    borderRadius: 50,
    opacity: 0.12,
    ...(Platform.OS === 'web' ? ({ filter: 'blur(30px)' } as object) : {}),
  },
});
