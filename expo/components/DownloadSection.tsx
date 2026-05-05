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
import { Apple, Play, Heart, ArrowUpRight, Sparkles, Shield, Lock, Zap } from 'lucide-react-native';
import { Link } from 'expo-router';
import { Colors } from '@/constants/colors';
import { useLanguage } from '@/contexts/LanguageContext';

export default function DownloadSection() {
  const { t, isRTL, textAlign, writingDirection, flexDirection } = useLanguage();
  const fadeIn = useRef(new Animated.Value(0)).current;
  const scaleCard = useRef(new Animated.Value(0.96)).current;
  const orbPulse = useRef(new Animated.Value(0)).current;
  const sparkleSpin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleCard, { toValue: 1, tension: 40, friction: 9, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(orbPulse, { toValue: 1, duration: 4500, useNativeDriver: true }),
        Animated.timing(orbPulse, { toValue: 0, duration: 4500, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(sparkleSpin, { toValue: 1, duration: 16000, useNativeDriver: true })
    ).start();
  }, [fadeIn, scaleCard, orbPulse, sparkleSpin]);

  const handleStore = () => {
    Linking.openURL('https://rork.com/p/h5yitrrxv4e3qreqccuca');
  };

  const orbA = orbPulse.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.7] });
  const orbB = orbPulse.interpolate({ inputRange: [0, 1], outputRange: [0.7, 0.3] });
  const spin = sparkleSpin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  const trustItems = [
    { Icon: Shield, label: 'Secure' },
    { Icon: Lock, label: 'Private' },
    { Icon: Zap, label: 'Fast' },
  ];

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <Animated.View style={[styles.ctaCard, { transform: [{ scale: scaleCard }] }]}>
        <LinearGradient
          colors={['#1E1B4B', '#0C0A2E', '#06060F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />

        <Animated.View style={[styles.orbViolet, { opacity: orbA }]} />
        <Animated.View style={[styles.orbCyan, { opacity: orbB }]} />
        <Animated.View style={[styles.orbMagenta, { opacity: orbA }]} />

        <View style={styles.cardBorder} pointerEvents="none" />

        <View style={styles.ctaInner}>
          <Animated.View style={[styles.sparkleWrap, { transform: [{ rotate: spin }] }]}>
            <LinearGradient
              colors={['#8B5CF6', '#22D3EE', '#EC4899', '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.sparkleInner}>
              <Sparkles size={20} color="#FFFFFF" strokeWidth={2.2} />
            </View>
          </Animated.View>

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
              testID="cta-app-store"
            >
              <View style={styles.storeBg} />
              <LinearGradient
                colors={['rgba(139,92,246,0.2)', 'rgba(34,211,238,0.15)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFillObject}
              />
              <View style={[styles.storeBtnRow, { flexDirection }]}>
                <View style={styles.storeIconWrap}>
                  <Apple size={22} color="#FFFFFF" strokeWidth={2} />
                </View>
                <View style={[styles.storeTextCol, isRTL && { alignItems: 'flex-end' as const }]}>
                  <Text style={[styles.storeSub, { writingDirection }]}>{t.download.downloadOn}</Text>
                  <Text style={[styles.storeMain, { writingDirection }]}>{t.download.appStore}</Text>
                </View>
                <View style={styles.arrowCircle}>
                  <ArrowUpRight size={14} color="#FFFFFF" strokeWidth={2.5} />
                </View>
              </View>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.storeBtn, pressed && styles.btnPress]}
              onPress={handleStore}
              testID="cta-google-play"
            >
              <View style={styles.storeBg} />
              <LinearGradient
                colors={['rgba(236,72,153,0.2)', 'rgba(252,211,77,0.15)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFillObject}
              />
              <View style={[styles.storeBtnRow, { flexDirection }]}>
                <View style={styles.storeIconWrap}>
                  <Play size={22} color="#FFFFFF" strokeWidth={2} fill="#FFFFFF" />
                </View>
                <View style={[styles.storeTextCol, isRTL && { alignItems: 'flex-end' as const }]}>
                  <Text style={[styles.storeSub, { writingDirection }]}>{t.download.getItOn}</Text>
                  <Text style={[styles.storeMain, { writingDirection }]}>{t.download.googlePlay}</Text>
                </View>
                <View style={styles.arrowCircle}>
                  <ArrowUpRight size={14} color="#FFFFFF" strokeWidth={2.5} />
                </View>
              </View>
            </Pressable>
          </View>

          <View style={styles.trustRow}>
            {trustItems.map((item, i) => (
              <View key={i} style={styles.trustItem}>
                <item.Icon size={13} color="rgba(255,255,255,0.55)" strokeWidth={2.2} />
                <Text style={styles.trustTxt}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.footerLine} />
        <View style={[styles.footerRow, { flexDirection }]}>
          <Text style={styles.footerTxt}>{t.download.madeWith}</Text>
          <Heart size={13} color="#EC4899" fill="#EC4899" />
          <Text style={styles.footerTxt}>{t.download.forAfrica}</Text>
        </View>
        <Text style={[styles.copyright, { textAlign: 'center' as const, writingDirection }]}>
          {t.download.copyright}
        </Text>
        <Link href="/privacy" asChild>
          <Pressable
            style={({ pressed }) => [styles.privacyLink, pressed && styles.privacyPressed]}
            testID="privacy-link"
          >
            <Text style={[styles.privacyTxt, { writingDirection }]}>{t.download.privacyPolicy}</Text>
          </Pressable>
        </Link>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 60,
    overflow: 'hidden' as const,
  },
  ctaCard: {
    marginHorizontal: 16,
    maxWidth: 980,
    width: '92%',
    alignSelf: 'center' as const,
    borderRadius: 32,
    overflow: 'hidden' as const,
    position: 'relative' as const,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.4,
    shadowRadius: 48,
    elevation: 16,
  },
  cardBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  orbViolet: {
    position: 'absolute' as const,
    top: -80,
    left: -80,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: '#8B5CF6',
    ...(Platform.OS === 'web' ? ({ filter: 'blur(80px)' } as object) : {}),
  },
  orbCyan: {
    position: 'absolute' as const,
    top: '40%',
    right: -100,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#22D3EE',
    ...(Platform.OS === 'web' ? ({ filter: 'blur(80px)' } as object) : {}),
  },
  orbMagenta: {
    position: 'absolute' as const,
    bottom: -60,
    left: '30%',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#EC4899',
    ...(Platform.OS === 'web' ? ({ filter: 'blur(70px)' } as object) : {}),
  },
  ctaInner: {
    paddingVertical: 64,
    paddingHorizontal: 28,
    alignItems: 'center' as const,
  },
  sparkleWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    overflow: 'hidden' as const,
    marginBottom: 24,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
  },
  sparkleInner: {
    position: 'absolute' as const,
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
    borderRadius: 14,
    backgroundColor: '#06060F',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  heading: {
    fontSize: 38,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    textAlign: 'center' as const,
    lineHeight: 44,
    letterSpacing: -1.2,
  },
  headingAccent: {
    color: '#A78BFA',
    ...(Platform.OS === 'web'
      ? ({
          backgroundImage: 'linear-gradient(120deg, #A78BFA 0%, #22D3EE 50%, #EC4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        } as object)
      : {}),
  },
  subtext: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center' as const,
    lineHeight: 26,
    marginTop: 16,
    maxWidth: 420,
  },
  buttonsCol: {
    marginTop: 36,
    gap: 14,
    width: '100%',
    maxWidth: 360,
  },
  storeBtn: {
    borderRadius: 20,
    overflow: 'hidden' as const,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    position: 'relative' as const,
  },
  storeBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.04)',
    ...(Platform.OS === 'web' ? ({ backdropFilter: 'blur(20px)' } as object) : {}),
  },
  storeBtnRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 14,
  },
  btnPress: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  storeIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  storeTextCol: {
    flex: 1,
  },
  storeSub: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '600' as const,
    letterSpacing: 0.5,
    textTransform: 'uppercase' as const,
  },
  storeMain: {
    fontSize: 17,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    letterSpacing: -0.3,
    marginTop: 2,
  },
  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  trustRow: {
    flexDirection: 'row' as const,
    gap: 18,
    marginTop: 32,
    flexWrap: 'wrap' as const,
    justifyContent: 'center' as const,
  },
  trustItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
  },
  trustTxt: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '700' as const,
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
  },
  footer: {
    marginTop: 64,
    paddingHorizontal: 24,
    alignItems: 'center' as const,
  },
  footerLine: {
    height: 1,
    width: '70%',
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginBottom: 28,
  },
  footerRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
  },
  footerTxt: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '500' as const,
  },
  copyright: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 12,
    textAlign: 'center' as const,
    lineHeight: 18,
  },
  privacyLink: {
    marginTop: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  privacyPressed: {
    opacity: 0.5,
  },
  privacyTxt: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '600' as const,
    textDecorationLine: 'underline' as const,
    letterSpacing: 0.3,
  },
});
