import React, { useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Animated, useWindowDimensions, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Star, Quote } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useLanguage } from '@/contexts/LanguageContext';

const THEMES = [
  { from: '#8B5CF6', to: '#6366F1', glow: 'rgba(139,92,246,0.45)' },
  { from: '#22D3EE', to: '#0EA5E9', glow: 'rgba(34,211,238,0.45)' },
  { from: '#EC4899', to: '#DB2777', glow: 'rgba(236,72,153,0.45)' },
  { from: '#FCD34D', to: '#F59E0B', glow: 'rgba(252,211,77,0.45)' },
] as const;

function TwinkleStar({ delay }: { delay: number }) {
  const v = useRef(new Animated.Value(0.7)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(v, { toValue: 1, duration: 600, delay, useNativeDriver: true }),
        Animated.timing(v, { toValue: 0.7, duration: 600, useNativeDriver: true }),
      ])
    ).start();
  }, [v, delay]);
  return (
    <Animated.View style={{ opacity: v, transform: [{ scale: v }] }}>
      <Star size={14} color="#FCD34D" fill="#FCD34D" />
    </Animated.View>
  );
}

export default function TestimonialsSection() {
  const { width } = useWindowDimensions();
  const { t, isRTL, textAlign, writingDirection, flexDirection, alignSelf } = useLanguage();
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
      Animated.timing(fadeIn, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(slideUp, { toValue: 0, tension: 40, friction: 10, useNativeDriver: true }),
    ]).start();
  }, [fadeIn, slideUp]);

  const cardW = Math.min(width * 0.84, 340);

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn, transform: [{ translateY: slideUp }] }]}>
      <View style={[styles.header, isRTL && { alignItems: 'flex-end' as const }]}>
        <View style={[styles.eyebrowRow, { alignSelf, flexDirection }]}>
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
        snapToInterval={cardW + 16}
      >
        {testimonials.map((item, i) => {
          const th = THEMES[i % THEMES.length];
          return (
            <View
              key={i}
              style={[
                styles.card,
                { width: cardW, shadowColor: th.glow },
              ]}
            >
              <View style={styles.cardBg} />
              <LinearGradient
                colors={[th.from + '20', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFillObject}
                pointerEvents="none"
              />
              <View style={[styles.cardBorder, { borderColor: th.from + '30' }]} pointerEvents="none" />

              <View style={[styles.quoteIcon, { shadowColor: th.glow }]}>
                <LinearGradient
                  colors={[th.from, th.to]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={StyleSheet.absoluteFillObject}
                />
                <Quote size={16} color="#FFF" strokeWidth={2.5} />
              </View>

              <Text style={[styles.quoteText, { textAlign, writingDirection }]}>{item.text}</Text>

              <View style={[styles.starsRow, { flexDirection }]}>
                {Array.from({ length: item.stars }).map((_, si) => (
                  <TwinkleStar key={si} delay={si * 200} />
                ))}
              </View>

              <View style={[styles.authorRow, { flexDirection }]}>
                <View style={[styles.avatar, { shadowColor: th.glow }]}>
                  <LinearGradient
                    colors={[th.from, th.to]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFillObject}
                  />
                  <Text style={styles.avatarLetter}>{item.name[0]}</Text>
                </View>
                <View style={isRTL ? { alignItems: 'flex-end' as const } : undefined}>
                  <Text style={[styles.authorName, { textAlign, writingDirection }]}>{item.name}</Text>
                  <Text style={[styles.authorLoc, { textAlign, writingDirection }]}>{item.location}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingBottom: 60,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 40,
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
    backgroundColor: Colors.magenta,
    shadowColor: Colors.magenta,
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800' as const,
    color: '#F9A8D4',
    letterSpacing: 2.8,
  },
  heading: {
    fontSize: 44,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    lineHeight: 48,
    letterSpacing: -1.4,
  },
  scrollContent: {
    paddingHorizontal: 24,
    gap: 16,
    paddingRight: 60,
  },
  card: {
    borderRadius: 24,
    padding: 26,
    overflow: 'hidden' as const,
    position: 'relative' as const,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 8,
  },
  cardBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20,20,40,0.55)',
    ...(Platform.OS === 'web' ? ({ backdropFilter: 'blur(24px) saturate(180%)' } as object) : {}),
  },
  cardBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
    borderWidth: 1,
  },
  quoteIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    overflow: 'hidden' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: 18,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  quoteText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 24,
    fontWeight: '500' as const,
    marginBottom: 22,
  },
  starsRow: {
    flexDirection: 'row' as const,
    gap: 4,
    marginBottom: 18,
  },
  authorRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    overflow: 'hidden' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  avatarLetter: {
    fontSize: 17,
    fontWeight: '900' as const,
    color: '#FFFFFF',
  },
  authorName: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  authorLoc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
  },
});
