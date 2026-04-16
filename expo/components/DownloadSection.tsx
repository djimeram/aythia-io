import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Linking,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Apple, Play, Heart, ArrowUpRight, Sparkles } from 'lucide-react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { useLanguage } from '@/contexts/LanguageContext';

export default function DownloadSection() {
  const { t, isRTL, textAlign, writingDirection, flexDirection } = useLanguage();
  const fadeIn = useRef(new Animated.Value(0)).current;
  const scaleCard = useRef(new Animated.Value(0.96)).current;
  const shimmer = useRef(new Animated.Value(0)).current;
  const floatY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(scaleCard, { toValue: 1, tension: 40, friction: 8, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 3000, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 3000, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatY, { toValue: -6, duration: 2000, useNativeDriver: true }),
        Animated.timing(floatY, { toValue: 6, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, [fadeIn, scaleCard, shimmer, floatY]);

  const handleStore = () => {
    Linking.openURL('https://rork.com/p/h5yitrrxv4e3qreqccuca');
  };

  const shimmerOpacity = shimmer.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.04, 0.12, 0.04],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <Animated.View style={[styles.ctaCard, { transform: [{ scale: scaleCard }] }]}>
        <LinearGradient
          colors={['#EA580C', '#C2410C', '#9A3412']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />

        <Animated.View style={[styles.shimmerOrb, { opacity: shimmerOpacity, transform: [{ translateY: floatY }] }]} />
        <View style={styles.patternCircle1} />
        <View style={styles.patternCircle2} />
        <View style={styles.patternCircle3} />

        <View style={styles.ctaInner}>
          <View style={styles.sparkleWrap}>
            <Sparkles size={20} color="rgba(255,255,255,0.6)" strokeWidth={2} />
          </View>

          <Text style={[styles.heading, { textAlign: 'center' as const, writingDirection }]}>
            {t.download.heading}{'\n'}
            <Text style={styles.headingAccent}>{t.download.headingAccent}</Text>
          </Text>

          <Text style={[styles.subtext, { textAlign: 'center' as const, writingDirection }]}>
            {t.download.subtext}
          </Text>

          <View style={styles.buttonsCol}>
            <Pressable
              style={({ pressed }) => [styles.storeBtn, pressed && styles.btnPress]}
              onPress={handleStore}
            >
              <View style={[styles.storeBtnRow, { flexDirection }]}>
                <View style={styles.storeIconWrap}>
                  <Apple size={22} color={Colors.text} strokeWidth={2} />
                </View>
                <View style={isRTL ? { alignItems: 'flex-end' as const } : undefined}>
                  <Text style={[styles.storeSub, { writingDirection }]}>{t.download.downloadOn}</Text>
                  <Text style={[styles.storeMain, { writingDirection }]}>{t.download.appStore}</Text>
                </View>
                <View style={styles.arrowCircle}>
                  <ArrowUpRight size={13} color={Colors.primary} strokeWidth={2.5} />
                </View>
              </View>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.storeBtn, pressed && styles.btnPress]}
              onPress={handleStore}
            >
              <View style={[styles.storeBtnRow, { flexDirection }]}>
                <View style={styles.storeIconWrap}>
                  <Play size={22} color={Colors.text} strokeWidth={2} />
                </View>
                <View style={isRTL ? { alignItems: 'flex-end' as const } : undefined}>
                  <Text style={[styles.storeSub, { writingDirection }]}>{t.download.getItOn}</Text>
                  <Text style={[styles.storeMain, { writingDirection }]}>{t.download.googlePlay}</Text>
                </View>
                <View style={styles.arrowCircle}>
                  <ArrowUpRight size={13} color={Colors.primary} strokeWidth={2.5} />
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.footerLine} />
        <View style={[styles.footerRow, { flexDirection }]}>
          <Text style={styles.footerTxt}>{t.download.madeWith}</Text>
          <Heart size={13} color="#E11D48" fill="#E11D48" />
          <Text style={styles.footerTxt}>{t.download.forAfrica}</Text>
        </View>
        <Text style={[styles.copyright, { textAlign: 'center' as const, writingDirection }]}>
          {t.download.copyright}
        </Text>
        <Pressable
          onPress={() => router.push('/privacy')}
          style={({ pressed }) => [styles.privacyLink, pressed && styles.privacyPressed]}
          testID="privacy-link"
        >
          <Text style={[styles.privacyTxt, { writingDirection }]}>{t.download.privacyPolicy}</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 48,
    backgroundColor: Colors.background,
    overflow: 'hidden' as const,
  },
  ctaCard: {
    marginHorizontal: 16,
    borderRadius: 28,
    overflow: 'hidden' as const,
    position: 'relative' as const,
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 12,
  },
  shimmerOrb: {
    position: 'absolute' as const,
    top: -40,
    right: -20,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
  },
  patternCircle1: {
    position: 'absolute' as const,
    top: -30,
    right: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  patternCircle2: {
    position: 'absolute' as const,
    bottom: -20,
    left: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  patternCircle3: {
    position: 'absolute' as const,
    top: '40%',
    left: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  ctaInner: {
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: 'center' as const,
  },
  sparkleWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: '900' as const,
    color: '#FFFFFF',
    textAlign: 'center' as const,
    lineHeight: 38,
    letterSpacing: -0.8,
  },
  headingAccent: {
    color: 'rgba(255,255,255,0.8)',
  },
  subtext: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center' as const,
    lineHeight: 23,
    marginTop: 14,
    maxWidth: 320,
  },
  buttonsCol: {
    marginTop: 32,
    gap: 12,
    width: '100%',
    maxWidth: 320,
  },
  storeBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden' as const,
  },
  storeBtnRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 14,
    paddingHorizontal: 18,
    gap: 12,
  },
  btnPress: {
    opacity: 0.9,
    transform: [{ scale: 0.97 }],
  },
  storeIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.04)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  storeSub: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '600' as const,
    letterSpacing: 0.3,
  },
  storeMain: {
    fontSize: 17,
    fontWeight: '800' as const,
    color: Colors.text,
    letterSpacing: -0.3,
  },
  arrowCircle: {
    marginLeft: 'auto' as const,
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: Colors.primaryGlow,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  footer: {
    marginTop: 52,
    paddingHorizontal: 24,
    alignItems: 'center' as const,
  },
  footerLine: {
    height: 1,
    width: '70%',
    backgroundColor: 'rgba(0,0,0,0.06)',
    marginBottom: 24,
  },
  footerRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
  },
  footerTxt: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500' as const,
  },
  copyright: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 10,
    textAlign: 'center' as const,
    lineHeight: 18,
  },
  privacyLink: {
    marginTop: 14,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  privacyPressed: {
    opacity: 0.6,
  },
  privacyTxt: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500' as const,
    textDecorationLine: 'underline' as const,
    letterSpacing: 0.2,
  },
});
