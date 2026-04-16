import React, { useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Animated, useWindowDimensions, ScrollView } from 'react-native';
import { Star, Quote } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useLanguage } from '@/contexts/LanguageContext';

const CARD_COLORS = ['#FFF7ED', '#F0FDF4', '#EFF6FF', '#FDF4FF'] as const;
const QUOTE_COLORS = ['#E8692E', '#1B9E8C', '#6366F1', '#EC4899'] as const;

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
      Animated.timing(fadeIn, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(slideUp, { toValue: 0, tension: 40, friction: 8, useNativeDriver: true }),
    ]).start();
  }, [fadeIn, slideUp]);

  const cardW = Math.min(width * 0.8, 310);

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn, transform: [{ translateY: slideUp }] }]}>
      <View style={[styles.header, isRTL && { alignItems: 'flex-end' as const }]}>
        <View style={[styles.eyebrowWrap, isRTL && { alignSelf: 'flex-end' as const }]}>
          <View style={styles.eyebrowLine} />
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
        {testimonials.map((item, i) => (
          <View key={i} style={[styles.card, { width: cardW, backgroundColor: CARD_COLORS[i % CARD_COLORS.length] }]}>
            <View style={[styles.quoteIconWrap, { backgroundColor: QUOTE_COLORS[i % QUOTE_COLORS.length] + '15' }]}>
              <Quote size={16} color={QUOTE_COLORS[i % QUOTE_COLORS.length]} strokeWidth={2.5} />
            </View>

            <Text style={[styles.quoteText, { textAlign, writingDirection }]}>{item.text}</Text>

            <View style={[styles.starsRow, { flexDirection }]}>
              {Array.from({ length: item.stars }).map((_, si) => (
                <Star key={si} size={14} color="#F59E0B" fill="#F59E0B" />
              ))}
            </View>

            <View style={[styles.author, { flexDirection }]}>
              <View style={[styles.avatar, { backgroundColor: QUOTE_COLORS[i % QUOTE_COLORS.length] + '18' }]}>
                <Text style={[styles.avatarText, { color: QUOTE_COLORS[i % QUOTE_COLORS.length] }]}>{item.name[0]}</Text>
              </View>
              <View style={isRTL ? { alignItems: 'flex-end' as const } : undefined}>
                <Text style={[styles.authorName, { textAlign, writingDirection }]}>{item.name}</Text>
                <Text style={[styles.authorLoc, { textAlign, writingDirection }]}>{item.location}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    paddingBottom: 24,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 28,
  },
  eyebrowWrap: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    alignSelf: 'flex-start' as const,
    gap: 10,
    marginBottom: 14,
  },
  eyebrowLine: {
    width: 24,
    height: 2,
    backgroundColor: '#6366F1',
    borderRadius: 1,
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
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(28,25,23,0.04)',
  },
  quoteIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: 16,
  },
  quoteText: {
    fontSize: 15,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 16,
    fontWeight: '500' as const,
  },
  starsRow: {
    flexDirection: 'row' as const,
    gap: 3,
    marginBottom: 18,
  },
  author: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(28,25,23,0.06)',
    paddingTop: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  avatarText: {
    fontSize: 16,
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
    marginTop: 1,
  },
});
