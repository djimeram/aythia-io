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
  accent: string;
}

function StepCard({ step, index, totalSteps }: { step: RideStep; index: number; totalSteps: number }) {
  const { width } = useWindowDimensions();
  const { t, isRTL, textAlign, writingDirection, flexDirection, alignSelf } = useLanguage();
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideX = useRef(new Animated.Value(index % 2 === 0 ? -30 : 30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, { toValue: 1, duration: 700, delay: index * 180, useNativeDriver: true }),
      Animated.spring(slideX, { toValue: 0, tension: 40, friction: 8, delay: index * 180, useNativeDriver: true }),
    ]).start();
  }, [fadeIn, slideX, index]);

  const Icon = step.icon;
  const imageHeight = Math.min(width * 0.7, 340);

  return (
    <Animated.View
      style={[
        stepStyles.card,
        {
          opacity: fadeIn,
          transform: [{ translateX: slideX }],
        },
      ]}
    >
      <View style={stepStyles.imageContainer}>
        <Image
          source={{ uri: step.image }}
          style={[stepStyles.image, { height: imageHeight }]}
          contentFit="cover"
          transition={400}
        />
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0.95)']}
          locations={[0.2, 0.55, 1]}
          style={StyleSheet.absoluteFillObject}
        />

        <View style={[stepStyles.imageOverlay, isRTL && { alignItems: 'flex-end' as const }]}>
          <View style={[stepStyles.stepBadge, { backgroundColor: step.accent + '15', borderColor: step.accent + '25' }]}>
            <View style={[stepStyles.stepNumCircle, { backgroundColor: step.accent }]}>
              <Text style={stepStyles.stepNumText}>{step.number}</Text>
            </View>
            <Icon size={16} color={step.accent} strokeWidth={2.5} />
          </View>
        </View>
      </View>

      <View style={[stepStyles.textContent, isRTL && { alignItems: 'flex-end' as const }]}>
        <Text style={[stepStyles.stepTitle, { textAlign, writingDirection }]}>{step.title}</Text>
        <Text style={[stepStyles.stepDesc, { textAlign, writingDirection }]}>{step.description}</Text>
      </View>

      {index < totalSteps - 1 && (
        <View style={stepStyles.connector}>
          <View style={stepStyles.connectorDots}>
            {[0, 1, 2].map((d) => (
              <View key={d} style={[stepStyles.connectorDot, { backgroundColor: step.accent, opacity: 0.3 + d * 0.2 }]} />
            ))}
          </View>
        </View>
      )}
    </Animated.View>
  );
}

export default function RideFlowSection() {
  const { t, language, isRTL, textAlign, writingDirection, alignSelf } = useLanguage();
  const images = getImages(language);
  const headerFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerFade, { toValue: 1, duration: 700, useNativeDriver: true }).start();
  }, [headerFade]);

  const steps: RideStep[] = useMemo(() => [
    { number: '01', title: t.rideFlow.step1Title, description: t.rideFlow.step1Desc, image: images.stepRequest, icon: Search, accent: '#E8692E' },
    { number: '02', title: t.rideFlow.step2Title, description: t.rideFlow.step2Desc, image: images.stepAccept, icon: UserCheck, accent: '#1B9E8C' },
    { number: '03', title: t.rideFlow.step3Title, description: t.rideFlow.step3Desc, image: images.stepPickup, icon: Navigation, accent: '#6366F1' },
    { number: '04', title: t.rideFlow.step4Title, description: t.rideFlow.step4Desc, image: images.stepJourney, icon: Route, accent: '#F59E0B' },
    { number: '05', title: t.rideFlow.step5Title, description: t.rideFlow.step5Desc, image: images.stepArrival, icon: Flag, accent: '#EC4899' },
  ], [t, images]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, isRTL && { alignItems: 'flex-end' as const }, { opacity: headerFade }]}>
        <View style={[styles.eyebrowWrap, { alignSelf }]}>
          <View style={[styles.eyebrowLine, { backgroundColor: Colors.accent }]} />
          <Text style={[styles.eyebrow, { writingDirection }]}>{t.rideFlow.eyebrow}</Text>
        </View>
        <Text style={[styles.heading, { textAlign, writingDirection }]}>{t.rideFlow.heading}</Text>
        <Text style={[styles.subheading, { textAlign, writingDirection }]}>{t.rideFlow.subheading}</Text>
      </Animated.View>

      <View style={styles.timeline}>
        {steps.map((step, idx) => (
          <StepCard key={step.number} step={step} index={idx} totalSteps={steps.length} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 72,
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 24,
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
    borderRadius: 1,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800' as const,
    color: Colors.accent,
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
    maxWidth: 340,
  },
  timeline: {
    gap: 16,
  },
});

const stepStyles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden' as const,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(28,25,23,0.04)',
  },
  imageContainer: {
    position: 'relative' as const,
    overflow: 'hidden' as const,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  image: {
    width: '100%',
  },
  imageOverlay: {
    position: 'absolute' as const,
    bottom: 16,
    left: 16,
    right: 16,
  },
  stepBadge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    alignSelf: 'flex-start' as const,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    gap: 10,
  },
  stepNumCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  stepNumText: {
    fontSize: 12,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  textContent: {
    padding: 24,
    paddingTop: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '900' as const,
    color: Colors.text,
    letterSpacing: -0.6,
    marginBottom: 8,
  },
  stepDesc: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  connector: {
    alignItems: 'center' as const,
    paddingBottom: 6,
  },
  connectorDots: {
    alignItems: 'center' as const,
    gap: 5,
    paddingVertical: 4,
  },
  connectorDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
});
