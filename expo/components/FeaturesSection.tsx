import React, { useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Animated, useWindowDimensions } from 'react-native';
import { Shield, Zap, MapPin, CreditCard, Star } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useLanguage } from '@/contexts/LanguageContext';

const FEATURE_THEMES = [
  { bg: '#FFF7ED', iconBg: '#FFEDD5', border: '#FED7AA', color: '#EA580C' },
  { bg: '#F0FDFA', iconBg: '#CCFBF1', border: '#99F6E4', color: '#0D9488' },
  { bg: '#EEF2FF', iconBg: '#E0E7FF', border: '#C7D2FE', color: '#6366F1' },
  { bg: '#FFFBEB', iconBg: '#FEF3C7', border: '#FDE68A', color: '#D97706' },
  { bg: '#FFF1F2', iconBg: '#FFE4E6', border: '#FECDD3', color: '#E11D48' },
] as const;

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
      Animated.timing(headerFade, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(headerSlide, { toValue: 0, tension: 40, friction: 9, useNativeDriver: true }),
    ]).start();

    Animated.stagger(
      90,
      anims.map(a =>
        Animated.spring(a, { toValue: 1, tension: 50, friction: 8, useNativeDriver: true })
      )
    ).start();
  }, [anims, headerFade, headerSlide]);

  const isWide = width > 500;
  const cardW = isWide ? (width - 72) / 2 : width - 48;

  return (
    <View style={styles.container}>
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

      <View style={[styles.grid, isWide && styles.gridWide]}>
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          const th = feat.theme;
          return (
            <Animated.View
              key={idx}
              style={[
                styles.card,
                {
                  width: cardW,
                  backgroundColor: th.bg,
                  borderColor: th.border,
                  opacity: anims[idx],
                  transform: [
                    {
                      translateY: anims[idx].interpolate({
                        inputRange: [0, 1],
                        outputRange: [36, 0],
                      }),
                    },
                    {
                      scale: anims[idx].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.95, 1],
                      }),
                    },
                  ],
                },
                isRTL && { alignItems: 'flex-end' as const },
              ]}
            >
              <View style={[styles.iconCircle, { backgroundColor: th.iconBg, alignSelf }]}>
                <Icon size={22} color={th.color} strokeWidth={2.2} />
              </View>
              <Text style={[styles.cardTitle, { textAlign, writingDirection, color: th.color }]}>
                {feat.title}
              </Text>
              <Text style={[styles.cardDesc, { textAlign, writingDirection }]}>{feat.desc}</Text>
              <View style={[styles.cardStripe, { backgroundColor: th.color }]} />
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 72,
    paddingHorizontal: 24,
    backgroundColor: Colors.background,
  },
  header: {
    marginBottom: 40,
  },
  eyebrowRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
    marginBottom: 14,
  },
  eyebrowDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800' as const,
    color: Colors.primary,
    letterSpacing: 2.5,
  },
  heading: {
    fontSize: 36,
    fontWeight: '900' as const,
    color: Colors.text,
    lineHeight: 42,
    letterSpacing: -1.2,
  },
  subheading: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 23,
    marginTop: 12,
    maxWidth: 340,
  },
  grid: {
    gap: 14,
  },
  gridWide: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
  },
  card: {
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    overflow: 'hidden' as const,
    position: 'relative' as const,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800' as const,
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  cardDesc: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 21,
  },
  cardStripe: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: 4,
    height: '100%',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    opacity: 0.5,
  },
});
