import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/constants/translations';

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'ع' },
];

interface NavbarProps {
  scrollY: Animated.Value;
  onNavigate: (section: string) => void;
}

export default function Navbar({ scrollY }: NavbarProps) {
  const { language, setLanguage, isRTL } = useLanguage();
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideDown = useRef(new Animated.Value(-20)).current;
  const logoSpin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, { toValue: 1, duration: 800, delay: 200, useNativeDriver: true }),
      Animated.spring(slideDown, { toValue: 0, tension: 50, friction: 9, delay: 200, useNativeDriver: true }),
    ]).start();
    Animated.loop(
      Animated.timing(logoSpin, { toValue: 1, duration: 14000, useNativeDriver: true })
    ).start();
  }, [fadeIn, slideDown, logoSpin]);

  const compact = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: [1, 0.92],
    extrapolate: 'clamp',
  });

  const spin = logoSpin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <Animated.View
      style={[
        styles.wrapper,
        { opacity: fadeIn, transform: [{ translateY: slideDown }, { scale: compact }] },
      ]}
    >
      <View style={[styles.pill, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <View style={styles.pillBg} />
        <LinearGradient
          colors={['rgba(139,92,246,0.15)', 'rgba(34,211,238,0.1)', 'rgba(236,72,153,0.12)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
          pointerEvents="none"
        />
        <View style={styles.pillBorder} pointerEvents="none" />

        <View style={[styles.brand, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <View style={styles.logoOuter}>
            <Animated.View style={[styles.logoRing, { transform: [{ rotate: spin }] }]}>
              <LinearGradient
                colors={['#8B5CF6', '#22D3EE', '#EC4899', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFillObject}
              />
            </Animated.View>
            <View style={styles.logoInner}>
              <Sparkles size={13} color="#FFF" strokeWidth={2.5} />
            </View>
          </View>
          <Text style={styles.logoText}>Aythia</Text>
        </View>

        <View style={[styles.langRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          {LANGUAGES.map((lang) => {
            const active = language === lang.code;
            return (
              <Pressable
                key={lang.code}
                onPress={() => setLanguage(lang.code)}
                style={({ pressed }) => [
                  styles.langPill,
                  active && styles.langPillActive,
                  pressed && styles.langPillPressed,
                ]}
                testID={`lang-${lang.code}`}
              >
                {active && (
                  <LinearGradient
                    colors={['#8B5CF6', '#22D3EE']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFillObject}
                  />
                )}
                <Text style={[styles.langLabel, active && styles.langLabelActive]}>{lang.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute' as const,
    top: Platform.OS === 'web' ? 16 : 52,
    left: 0,
    right: 0,
    zIndex: 100,
    alignItems: 'center' as const,
    paddingHorizontal: 16,
  },
  pill: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
    minWidth: 280,
    maxWidth: 520,
    width: '100%',
    overflow: 'hidden' as const,
    gap: 14,
  },
  pillBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(12,12,28,0.65)',
    ...(Platform.OS === 'web'
      ? ({
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        } as object)
      : {}),
  },
  pillBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  brand: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 10,
    paddingLeft: 4,
  },
  logoOuter: {
    width: 30,
    height: 30,
    borderRadius: 10,
    overflow: 'hidden' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  logoRing: {
    ...StyleSheet.absoluteFillObject,
  },
  logoInner: {
    position: 'absolute' as const,
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
    borderRadius: 8,
    backgroundColor: '#06060F',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  logoText: {
    fontSize: 17,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    letterSpacing: -0.4,
  },
  langRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 999,
    padding: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  langPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: 'hidden' as const,
    minWidth: 38,
    alignItems: 'center' as const,
  },
  langPillActive: {
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 6,
  },
  langPillPressed: {
    opacity: 0.7,
  },
  langLabel: {
    fontSize: 11,
    fontWeight: '700' as const,
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: 0.6,
  },
  langLabelActive: {
    color: '#FFFFFF',
  },
});
