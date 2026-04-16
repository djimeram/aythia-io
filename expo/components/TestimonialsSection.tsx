import React, { useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Animated, useWindowDimensions, ScrollView } from 'react-native';
import { Star, Quote } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useLanguage } from '@/contexts/LanguageContext';

const THEMES = [
  { bg: '#FFFFFF', accent: '#EA580C', quoteBg: '#FFF7ED', avatarBg: '#FFEDD5' },
  { bg: '#FFFFFF', accent: '#0D9488', quoteBg: '#F0FDFA', avatarBg: '#CCFBF1' },
  { bg: '#FFFFFF', accent: '#6366F1', quoteBg: '#EEF2FF', avatarBg: '#E0E7FF' },
  { bg: '#FFFFFF', accent: '#E11D48', quoteBg: '#FFF1F2', avatarBg: '#FFE4E6' },
] as const;

export default function TestimonialsSection() {
  const { width } = useWindowDimensions();
  const { t, isRTL, textAlign, writingDirection, flexDirection } = useLanguage();
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(30)).current;

  const testimonials = useMemo(() => [
    { name: t.testimonials.t1Name, location: t.testimonials.t1Location, text: t.testimonials.t1Text, stars: 5 },
    { name: t.testimonials.t2Name, location: t.testimonials.t2Location, text: t.testimonials.t2Text, stars: 5 },
    { name: t.testimonials.t3Name, location: t.testimonials.t3Location, text: t.testimonials.t3Text, stars: 5 },
    { name: t.testimonials.t4Name, location: t.testimonials.t4Location, text: t.testimonials.t4Text, stars: 5 },
  ], [t]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(slideUp, { toValue: 0, tension: 40, friction: 9, useNativeDriver: true }),
    ]).start();
  }, [fadeIn, slideUp]);

  const cardW = Math.min(width * 0.82, 320);

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn, transform: [{ translateY: slideUp }] }]}>
      <View style={styles.topLine} />

      <View style={[styles.header, isRTL && { alignItems: 'flex-end' as const }]}>
        <View style={[styles.eyebrowRow, isRTL && { alignSelf: 'flex-end' as const, flexDirection: 'row-reverse' as const }]}>
          <View style={styles.eyebrowDot} />
          <Text style={[styles.eyebrow, { writingDirection }]}>{t.testimonials.eyebrow}</Text>
        </View>
        <Text style={[styles.heading, { textAlign, writingDirection }]}>{t.testimonials.heading}</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={cardW + 14}
      >
        {testimonials.map((item, i) => {
          const th = THEMES[i % THEMES.length];
          return (
            <View
              key={i}
              style={[
                styles.card,
                {
                  width: cardW,
                  backgroundColor: th.bg,
                },
              ]}
            >
              <View style={[styles.cardTop, { backgroundColor: th.quoteBg }]}>
                <View style={[styles.quoteIcon, { backgroundColor: th.accent + '15' }]}>
                  <Quote size={15} color={th.accent} strokeWidth={2.5} />
                </View>
                <Text style={[styles.quoteText, { textAlign, writingDirection }]}>{item.text}</Text>
              </View>

              <View style={styles.cardBottom}>
                <View style={[styles.starsRow, { flexDirection }]}>
                  {Array.from({ length: item.stars }).map((_, si) => (
                    <Star key={si} size={13} color="#F59E0B" fill="#F59E0B" />
                  ))}
                </View>

                <View style={[styles.authorRow, { flexDirection }]}>
                  <View style={[styles.avatar, { backgroundColor: th.avatarBg }]}>
                    <Text style={[styles.avatarLetter, { color: th.accent }]}>{item.name[0]}</Text>
                  </View>
                  <View style={isRTL ? { alignItems: 'flex-end' as const } : undefined}>
                    <Text style={[styles.authorName, { textAlign, writingDirection }]}>{item.name}</Text>
                    <Text style={[styles.authorLoc, { textAlign, writingDirection }]}>{item.location}</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.cardAccent, { backgroundColor: th.accent }]} />
            </View>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingBottom: 32,
    backgroundColor: Colors.background,
  },
  topLine: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.04)',
    marginHorizontal: 24,
    marginBottom: 48,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 28,
  },
  eyebrowRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    alignSelf: 'flex-start' as const,
    gap: 8,
    marginBottom: 14,
  },
  eyebrowDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6366F1',
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800' as const,
    color: '#6366F1',
    letterSpacing: 2.5,
  },
  heading: {
    fontSize: 34,
    fontWeight: '900' as const,
    color: Colors.text,
    lineHeight: 40,
    letterSpacing: -1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    gap: 14,
    paddingRight: 48,
  },
  card: {
    borderRadius: 22,
    overflow: 'hidden' as const,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    position: 'relative' as const,
  },
  cardTop: {
    padding: 22,
    paddingBottom: 18,
  },
  quoteIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: 14,
  },
  quoteText: {
    fontSize: 15,
    color: Colors.text,
    lineHeight: 24,
    fontWeight: '500' as const,
  },
  cardBottom: {
    padding: 22,
    paddingTop: 14,
  },
  starsRow: {
    flexDirection: 'row' as const,
    gap: 3,
    marginBottom: 14,
  },
  authorRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  avatarLetter: {
    fontSize: 17,
    fontWeight: '800' as const,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  authorLoc: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  cardAccent: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
  },
});
