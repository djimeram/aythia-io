import React, { useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Animated, useWindowDimensions } from 'react-native';
import { Shield, Zap, MapPin, CreditCard, Star } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useLanguage } from '@/contexts/LanguageContext';

const ACCENT_COLORS = ['#E8692E', '#1B9E8C', '#6366F1', '#F59E0B', '#EC4899'] as const;

export default function FeaturesSection() {
  const { width } = useWindowDimensions();
  const { t, isRTL, textAlign, writingDirection, flexDirection, alignSelf } = useLanguage();
  const anims = useRef([0, 1, 2, 3, 4].map(() => new Animated.Value(0))).current;
  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(20)).current;

  const features = useMemo(() => [
    { icon: Shield, title: t.features.safetyTitle, desc: t.features.safetyDesc, color: ACCENT_COLORS[0] },
    { icon: Zap, title: t.features.matchingTitle, desc: t.features.matchingDesc, color: ACCENT_COLORS[1] },
    { icon: MapPin, title: t.features.trackingTitle, desc: t.features.trackingDesc, color: ACCENT_COLORS[2] },
    { icon: CreditCard, title: t.features.paymentTitle, desc: t.features.paymentDesc, color: ACCENT_COLORS[3] },
    { icon: Star, title: t.features.ratedTitle, desc: t.features.ratedDesc, color: ACCENT_COLORS[4] },
  ], [t]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(headerSlide, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();

    Animated.stagger(
      100,
      anims.map(a =>
        Animated.spring(a, { toValue: 1, tension: 50, friction: 8, useNativeDriver: true })
      )
    ).start();
  }, [anims, headerFade, headerSlide]);

  const isWide = width > 500;
  const cardWidth = isWide ? (width - 72) / 2 : width - 48;

  return (
    <View style={styles.container}>
      <View style={styles.decorBar} />

      <Animated.View style={[styles.header, isRTL && { alignItems: 'flex-end' as const }, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}>
        <View style={[styles.eyebrowWrap, { alignSelf }]}>
          <View style={styles.eyebrowLine} />
          <Text style={[styles.eyebrow, { writingDirection }]}>{t.features.eyebrow}</Text>
        </View>
        <Text style={[styles.heading, { textAlign, writingDirection }]}>{t.features.heading}</Text>
        <Text style={[styles.subheading, { textAlign, writingDirection }]}>{t.features.subheading}</Text>
      </Animated.View>

      <View style={[styles.grid, isWide && styles.gridWide]}>
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          const bgTint = feat.color + '0A';
          const iconBg = feat.color + '12';
          return (
            <Animated.View
              key={idx}
              style={[
                styles.card,
                {
                  width: cardWidth,
                  opacity: anims[idx],
                  transform: [{
                    translateY: anims[idx].interpolate({ inputRange: [0, 1], outputRange: [40, 0] }),
                  }],
                  backgroundColor: bgTint,
                },
                isRTL && { alignItems: 'flex-end' as const },
              ]}
            >
              <View style={[styles.iconWrap, { backgroundColor: iconBg, alignSelf }]}>
                <Icon size={22} color={feat.color} strokeWidth={2.2} />
              </View>
              <Text style={[styles.cardTitle, { textAlign, writingDirection }]}>{feat.title}</Text>
              <Text style={[styles.cardDesc, { textAlign, writingDirection }]}>{feat.desc}</Text>
              <View style={[styles.cardAccent, { backgroundColor: feat.color }]} />
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
    position: 'relative' as const,
  },
  decorBar: {
    position: 'absolute' as const,
    top: 0,
    left: 24,
    right: 24,
    height: 1,
    backgroundColor: 'rgba(28,25,23,0.06)',
  },
  header: {
    marginBottom: 36,
  },
  eyebrowWrap: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 10,
    marginBottom: 14,
  },
  eyebrowLine: {
    width: 24,
    height: 2,
    backgroundColor: Colors.primary,
    borderRadius: 1,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800' as const,
    color: Colors.primary,
    letterSpacing: 2.5,
  },
  heading: {
    fontSize: 38,
    fontWeight: '900' as const,
    color: Colors.text,
    lineHeight: 44,
    letterSpacing: -1.2,
  },
  subheading: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 23,
    marginTop: 12,
    maxWidth: 320,
  },
  grid: {
    gap: 14,
  },
  gridWide: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
  },
  card: {
    borderRadius: 22,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(28,25,23,0.04)',
    overflow: 'hidden' as const,
    position: 'relative' as const,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800' as const,
    color: Colors.text,
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  cardDesc: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 21,
  },
  cardAccent: {
    position: 'absolute' as const,
    bottom: 0,
    left: 24,
    right: 24,
    height: 3,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    opacity: 0.4,
  },
});
