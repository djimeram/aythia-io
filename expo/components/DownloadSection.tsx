import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Apple, Play, Heart, ArrowUpRight } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useLanguage } from '@/contexts/LanguageContext';

export default function DownloadSection() {
  const { t, isRTL, textAlign, writingDirection, flexDirection } = useLanguage();
  const fadeIn = useRef(new Animated.Value(0)).current;
  const scaleBtn = useRef(new Animated.Value(0.95)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.timing(fadeIn, { toValue: 1, duration: 700, useNativeDriver: true }).start();
    Animated.spring(scaleBtn, { toValue: 1, tension: 40, friction: 8, useNativeDriver: true }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 0.8, duration: 2500, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.4, duration: 2500, useNativeDriver: true }),
      ])
    ).start();
  }, [fadeIn, scaleBtn, glowAnim]);

  const handleStore = () => {
    Linking.openURL('https://rork.com/p/h5yitrrxv4e3qreqccuca');
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <Animated.View style={[styles.glowOrb1, { opacity: glowAnim }]} />
      <Animated.View style={[styles.glowOrb2, { opacity: glowAnim }]} />

      <View style={styles.ctaCard}>
        <LinearGradient
          colors={['#E8692E', '#C9541E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />

        <View style={styles.ctaCardPattern1} />
        <View style={styles.ctaCardPattern2} />

        <View style={styles.ctaContent}>
          <Text style={[styles.heading, { textAlign: 'center' as const, writingDirection }]}>
            {t.download.heading}{'\n'}
            <Text style={styles.headingAccent}>{t.download.headingAccent}</Text>
          </Text>

          <Text style={[styles.subtext, { textAlign: 'center' as const, writingDirection }]}>
            {t.download.subtext}
          </Text>

          <Animated.View style={[styles.buttonsWrap, { transform: [{ scale: scaleBtn }] }]}>
            <Pressable
              style={({ pressed }) => [styles.storeBtn, pressed && styles.btnPressed]}
              onPress={handleStore}
            >
              <View style={[styles.storeBtnInner, { flexDirection }]}>
                <Apple size={22} color="#1C1917" strokeWidth={2} />
                <View style={isRTL ? { alignItems: 'flex-end' as const } : undefined}>
                  <Text style={[styles.storeBtnSub, { writingDirection }]}>{t.download.downloadOn}</Text>
                  <Text style={[styles.storeBtnMain, { writingDirection }]}>{t.download.appStore}</Text>
                </View>
                <View style={styles.btnArrow}>
                  <ArrowUpRight size={14} color={Colors.primary} strokeWidth={2.5} />
                </View>
              </View>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.storeBtn, pressed && styles.btnPressed]}
              onPress={handleStore}
            >
              <View style={[styles.storeBtnInner, { flexDirection }]}>
                <Play size={22} color="#1C1917" strokeWidth={2} />
                <View style={isRTL ? { alignItems: 'flex-end' as const } : undefined}>
                  <Text style={[styles.storeBtnSub, { writingDirection }]}>{t.download.getItOn}</Text>
                  <Text style={[styles.storeBtnMain, { writingDirection }]}>{t.download.googlePlay}</Text>
                </View>
                <View style={styles.btnArrow}>
                  <ArrowUpRight size={14} color={Colors.primary} strokeWidth={2.5} />
                </View>
              </View>
            </Pressable>
          </Animated.View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerDivider} />
        <View style={[styles.footerContent, { flexDirection }]}>
          <Text style={styles.footerText}>{t.download.madeWith}</Text>
          <Heart size={13} color="#EC4899" fill="#EC4899" />
          <Text style={styles.footerText}>{t.download.forAfrica}</Text>
        </View>
        <Text style={[styles.copyright, { textAlign: 'center' as const, writingDirection }]}>
          {t.download.copyright}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingBottom: 44,
    backgroundColor: Colors.background,
    overflow: 'hidden' as const,
    position: 'relative' as const,
  },
  glowOrb1: {
    position: 'absolute' as const,
    top: -40,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(232,105,46,0.06)',
  },
  glowOrb2: {
    position: 'absolute' as const,
    bottom: 40,
    left: -80,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(27,158,140,0.05)',
  },
  ctaCard: {
    marginHorizontal: 16,
    borderRadius: 28,
    overflow: 'hidden' as const,
    position: 'relative' as const,
  },
  ctaCardPattern1: {
    position: 'absolute' as const,
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  ctaCardPattern2: {
    position: 'absolute' as const,
    bottom: -20,
    left: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  ctaContent: {
    paddingVertical: 44,
    paddingHorizontal: 24,
    alignItems: 'center' as const,
  },
  heading: {
    fontSize: 34,
    fontWeight: '900' as const,
    color: '#FFFFFF',
    textAlign: 'center' as const,
    lineHeight: 40,
    letterSpacing: -1,
  },
  headingAccent: {
    color: 'rgba(255,255,255,0.85)',
  },
  subtext: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center' as const,
    lineHeight: 23,
    marginTop: 14,
    maxWidth: 320,
  },
  buttonsWrap: {
    marginTop: 32,
    gap: 12,
    width: '100%',
    maxWidth: 320,
  },
  storeBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden' as const,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  storeBtnInner: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 15,
    paddingHorizontal: 22,
    gap: 14,
  },
  btnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.97 }],
  },
  storeBtnSub: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '600' as const,
    letterSpacing: 0.3,
  },
  storeBtnMain: {
    fontSize: 17,
    fontWeight: '800' as const,
    color: Colors.text,
    letterSpacing: -0.3,
  },
  btnArrow: {
    marginLeft: 'auto' as const,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(232,105,46,0.08)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  footer: {
    marginTop: 48,
    paddingHorizontal: 24,
    alignItems: 'center' as const,
  },
  footerDivider: {
    height: 1,
    width: '80%',
    backgroundColor: 'rgba(28,25,23,0.06)',
    marginBottom: 24,
  },
  footerContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
  },
  footerText: {
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
});
