import React, { useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Animated, useWindowDimensions, Platform } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, UserCheck, Navigation, Route, Flag } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { getImages } from '@/constants/images';
import { useLanguage } from '@/contexts/LanguageContext';

interface RideStep {
  number: string;
  title: string;
  description: string;
  image: string;
  icon: typeof Search;
  from: string;
  to: string;
  glow: string;
}

function StepCard({ step, index, total }: { step: RideStep; index: number; total: number }) {
  const { width } = useWindowDimensions();
  const { isRTL, textAlign, writingDirection } = useLanguage();
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideY = useRef(new Animated.Value(60)).current;

  useEffect(() => {
    const delay = index * 140;
    Animated.parallel([
      Animated.timing(fadeIn, { toValue: 1, duration: 700, delay, useNativeDriver: true }),
      Animated.spring(slideY, { toValue: 0, tension: 40, friction: 10, delay, useNativeDriver: true }),
    ]).start();
  }, [fadeIn, slideY, index]);

  const Icon = step.icon;
  const imgH = Math.min(width * 0.55, 260);

  return (
    <Animated.View style={[cardStyles.wrap, { opacity: fadeIn, transform: [{ translateY: slideY }] }]}>
      <View style={cardStyles.timelineCol}>
        <View style={[cardStyles.dotOuter, { shadowColor: step.glow }]}>
          <LinearGradient
            colors={[step.from, step.to]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
          <Text style={cardStyles.dotNum}>{step.number}</Text>
        </View>
        {index < total - 1 && (
          <View style={cardStyles.lineWrap}>
            <LinearGradient
              colors={[step.from + '88', 'rgba(255,255,255,0.05)']}
              style={cardStyles.line}
            />
          </View>
        )}
      </View>

      <View style={cardStyles.cardCol}>
        <View style={cardStyles.card}>
          <View style={cardStyles.cardBg} />
          <View style={[cardStyles.cardBorder, { borderColor: step.from + '40' }]} pointerEvents="none" />

          <View style={cardStyles.imgWrap}>
            <Image
              source={{ uri: step.image }}
              style={[cardStyles.img, { height: imgH }]}
              contentFit="cover"
              transition={400}
            />
            <LinearGradient
              colors={['transparent', 'rgba(6,6,15,0.4)', 'rgba(6,6,15,0.95)']}
              locations={[0.2, 0.6, 1]}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={[cardStyles.iconBadge, { shadowColor: step.glow }]}>
              <LinearGradient
                colors={[step.from, step.to]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFillObject}
              />
              <Icon size={18} color="#FFF" strokeWidth={2.4} />
            </View>
          </View>

          <View style={[cardStyles.body, isRTL && { alignItems: 'flex-end' as const }]}>
            <Text style={[cardStyles.title, { textAlign, writingDirection }]}>{step.title}</Text>
            <Text style={[cardStyles.desc, { textAlign, writingDirection }]}>{step.description}</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

export default function RideFlowSection() {
  const { t, language, isRTL, textAlign, writingDirection, alignSelf, flexDirection } = useLanguage();
  const images = getImages(language);
  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(headerSlide, { toValue: 0, tension: 40, friction: 10, useNativeDriver: true }),
    ]).start();
  }, [headerFade, headerSlide]);

  const steps: RideStep[] = useMemo(() => [
    { number: '01', title: t.rideFlow.step1Title, description: t.rideFlow.step1Desc, image: images.stepRequest, icon: Search, from: '#8B5CF6', to: '#6366F1', glow: 'rgba(139,92,246,0.5)' },
    { number: '02', title: t.rideFlow.step2Title, description: t.rideFlow.step2Desc, image: images.stepAccept, icon: UserCheck, from: '#22D3EE', to: '#0EA5E9', glow: 'rgba(34,211,238,0.5)' },
    { number: '03', title: t.rideFlow.step3Title, description: t.rideFlow.step3Desc, image: images.stepPickup, icon: Navigation, from: '#EC4899', to: '#DB2777', glow: 'rgba(236,72,153,0.5)' },
    { number: '04', title: t.rideFlow.step4Title, description: t.rideFlow.step4Desc, image: images.stepJourney, icon: Route, from: '#FCD34D', to: '#F59E0B', glow: 'rgba(252,211,77,0.5)' },
    { number: '05', title: t.rideFlow.step5Title, description: t.rideFlow.step5Desc, image: images.stepArrival, icon: Flag, from: '#34D399', to: '#10B981', glow: 'rgba(52,211,153,0.5)' },
  ], [t, images]);

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
          <Text style={[styles.eyebrow, { writingDirection }]}>{t.rideFlow.eyebrow}</Text>
        </View>
        <Text style={[styles.heading, { textAlign, writingDirection }]}>{t.rideFlow.heading}</Text>
        <Text style={[styles.subheading, { textAlign, writingDirection }]}>{t.rideFlow.subheading}</Text>
      </Animated.View>

      <View style={styles.timeline}>
        {steps.map((step, idx) => (
          <StepCard key={step.number} step={step} index={idx} total={steps.length} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingBottom: 80,
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
    backgroundColor: Colors.cyan,
    shadowColor: Colors.cyan,
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800' as const,
    color: '#67E8F9',
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
    maxWidth: 520,
  },
  timeline: {
    paddingHorizontal: 20,
    maxWidth: 920,
    width: '100%',
    alignSelf: 'center' as const,
    gap: 0,
  },
});

const cardStyles = StyleSheet.create({
  wrap: {
    flexDirection: 'row' as const,
    alignItems: 'stretch' as const,
    gap: 16,
  },
  timelineCol: {
    width: 48,
    alignItems: 'center' as const,
  },
  dotOuter: {
    width: 48,
    height: 48,
    borderRadius: 16,
    overflow: 'hidden' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 8,
  },
  dotNum: {
    fontSize: 13,
    fontWeight: '900' as const,
    color: '#FFF',
    letterSpacing: 0.5,
  },
  lineWrap: {
    flex: 1,
    width: 2,
    alignItems: 'center' as const,
    paddingVertical: 8,
  },
  line: {
    flex: 1,
    width: 2,
    borderRadius: 1,
  },
  cardCol: {
    flex: 1,
    paddingBottom: 28,
  },
  card: {
    borderRadius: 22,
    overflow: 'hidden' as const,
    position: 'relative' as const,
  },
  cardBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20,20,40,0.5)',
    ...(Platform.OS === 'web' ? ({ backdropFilter: 'blur(20px) saturate(180%)' } as object) : {}),
  },
  cardBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 22,
    borderWidth: 1,
  },
  imgWrap: {
    position: 'relative' as const,
    overflow: 'hidden' as const,
  },
  img: {
    width: '100%',
  },
  iconBadge: {
    position: 'absolute' as const,
    top: 14,
    left: 14,
    width: 38,
    height: 38,
    borderRadius: 12,
    overflow: 'hidden' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 6,
  },
  body: {
    padding: 22,
    paddingTop: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: '800' as const,
    letterSpacing: -0.4,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  desc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 22,
  },
});
