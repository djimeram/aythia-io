import React, { useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Animated, useWindowDimensions } from 'react-native';
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
  color: string;
  lightBg: string;
}

function StepCard({ step, index, total }: { step: RideStep; index: number; total: number }) {
  const { width } = useWindowDimensions();
  const { isRTL, textAlign, writingDirection } = useLanguage();
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    const delay = index * 150;
    Animated.parallel([
      Animated.timing(fadeIn, { toValue: 1, duration: 600, delay, useNativeDriver: true }),
      Animated.spring(slideY, { toValue: 0, tension: 40, friction: 9, delay, useNativeDriver: true }),
    ]).start();
  }, [fadeIn, slideY, index]);

  const Icon = step.icon;
  const imgH = Math.min(width * 0.6, 280);
  const isEven = index % 2 === 0;

  return (
    <Animated.View style={[cardStyles.wrap, { opacity: fadeIn, transform: [{ translateY: slideY }] }]}>
      <View style={[cardStyles.card, { backgroundColor: step.lightBg }]}>
        <View style={cardStyles.imgWrap}>
          <Image
            source={{ uri: step.image }}
            style={[cardStyles.img, { height: imgH }]}
            contentFit="cover"
            transition={400}
          />
          <LinearGradient
            colors={['transparent', 'rgba(255,255,255,0.15)', step.lightBg]}
            locations={[0.3, 0.6, 1]}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={[cardStyles.numBadge, { backgroundColor: step.color }]}>
            <Text style={cardStyles.numText}>{step.number}</Text>
          </View>
        </View>

        <View style={[cardStyles.body, isRTL && { alignItems: 'flex-end' as const }]}>
          <View style={[cardStyles.iconRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <View style={[cardStyles.iconCircle, { backgroundColor: step.color + '18' }]}>
              <Icon size={18} color={step.color} strokeWidth={2.2} />
            </View>
            <Text style={[cardStyles.title, { textAlign, writingDirection, color: step.color }]}>
              {step.title}
            </Text>
          </View>
          <Text style={[cardStyles.desc, { textAlign, writingDirection }]}>{step.description}</Text>
        </View>
      </View>

      {index < total - 1 && (
        <View style={cardStyles.connector}>
          <View style={[cardStyles.connLine, { backgroundColor: step.color + '30' }]} />
          <View style={[cardStyles.connDot, { backgroundColor: step.color + '50' }]} />
        </View>
      )}
    </Animated.View>
  );
}

export default function RideFlowSection() {
  const { t, language, isRTL, textAlign, writingDirection, alignSelf } = useLanguage();
  const images = getImages(language);
  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(headerSlide, { toValue: 0, tension: 40, friction: 9, useNativeDriver: true }),
    ]).start();
  }, [headerFade, headerSlide]);

  const steps: RideStep[] = useMemo(() => [
    { number: '01', title: t.rideFlow.step1Title, description: t.rideFlow.step1Desc, image: images.stepRequest, icon: Search, color: '#EA580C', lightBg: '#FFF7ED' },
    { number: '02', title: t.rideFlow.step2Title, description: t.rideFlow.step2Desc, image: images.stepAccept, icon: UserCheck, color: '#0D9488', lightBg: '#F0FDFA' },
    { number: '03', title: t.rideFlow.step3Title, description: t.rideFlow.step3Desc, image: images.stepPickup, icon: Navigation, color: '#6366F1', lightBg: '#EEF2FF' },
    { number: '04', title: t.rideFlow.step4Title, description: t.rideFlow.step4Desc, image: images.stepJourney, icon: Route, color: '#D97706', lightBg: '#FFFBEB' },
    { number: '05', title: t.rideFlow.step5Title, description: t.rideFlow.step5Desc, image: images.stepArrival, icon: Flag, color: '#E11D48', lightBg: '#FFF1F2' },
  ], [t, images]);

  return (
    <View style={styles.container}>
      <View style={styles.topLine} />

      <Animated.View
        style={[
          styles.header,
          isRTL && { alignItems: 'flex-end' as const },
          { opacity: headerFade, transform: [{ translateY: headerSlide }] },
        ]}
      >
        <View style={[styles.eyebrowRow, { alignSelf, flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <View style={[styles.eyebrowDot, { backgroundColor: Colors.accent }]} />
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
    paddingTop: 72,
    paddingBottom: 48,
    backgroundColor: '#FFFFFF',
  },
  topLine: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.04)',
    marginHorizontal: 24,
    marginBottom: 0,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 48,
    marginBottom: 36,
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
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800' as const,
    color: Colors.accent,
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
    maxWidth: 360,
  },
  timeline: {
    paddingHorizontal: 16,
    gap: 0,
  },
});

const cardStyles = StyleSheet.create({
  wrap: {
    alignItems: 'center' as const,
  },
  card: {
    borderRadius: 24,
    overflow: 'hidden' as const,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
  },
  imgWrap: {
    position: 'relative' as const,
    overflow: 'hidden' as const,
  },
  img: {
    width: '100%',
  },
  numBadge: {
    position: 'absolute' as const,
    top: 16,
    left: 16,
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  numText: {
    fontSize: 14,
    fontWeight: '900' as const,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  body: {
    padding: 22,
    paddingTop: 18,
  },
  iconRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 10,
    marginBottom: 8,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  title: {
    fontSize: 20,
    fontWeight: '800' as const,
    letterSpacing: -0.4,
    flex: 1,
  },
  desc: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  connector: {
    alignItems: 'center' as const,
    height: 40,
    justifyContent: 'center' as const,
  },
  connLine: {
    width: 2,
    height: 28,
    borderRadius: 1,
  },
  connDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 2,
  },
});
