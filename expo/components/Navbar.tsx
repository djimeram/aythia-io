import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated, Platform } from 'react-native';
import { Globe } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/constants/translations';

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'ar', label: 'عر', flag: '🇸🇦' },
];

interface NavbarProps {
  scrollY: Animated.Value;
  onNavigate: (section: string) => void;
}

export default function Navbar({ scrollY, onNavigate }: NavbarProps) {
  const { t, language, setLanguage, isRTL, flexDirection } = useLanguage();
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, { toValue: 1, duration: 600, delay: 300, useNativeDriver: true }).start();
  }, [fadeIn]);

  const bgOpacity = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const borderOpacity = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.wrapper, { opacity: fadeIn }]}>
      <Animated.View style={[styles.bgFill, { opacity: bgOpacity }]} />
      <Animated.View style={[styles.borderFill, { opacity: borderOpacity }]} />

      <View style={[styles.inner, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <View style={[styles.brand, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <View style={styles.logoMark}>
            <Text style={styles.logoLetter}>A</Text>
          </View>
          <Text style={styles.logoText}>Aythia</Text>
        </View>

        <View style={[styles.langRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <Globe size={13} color={Colors.textMuted} strokeWidth={2} />
          {LANGUAGES.map((lang) => {
            const active = language === lang.code;
            return (
              <Pressable
                key={lang.code}
                onPress={() => setLanguage(lang.code)}
                style={[styles.langPill, active && styles.langPillActive]}
                testID={`lang-${lang.code}`}
              >
                <Text style={styles.langFlag}>{lang.flag}</Text>
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
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingTop: Platform.OS === 'web' ? 12 : 52,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  bgFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.88)',
    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(20px)' } : {}),
  },
  borderFill: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  inner: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  brand: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 10,
  },
  logoMark: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  logoLetter: {
    fontSize: 17,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    marginTop: -1,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '800' as const,
    color: Colors.text,
    letterSpacing: -0.5,
  },
  langRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 24,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  langPill: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 16,
    gap: 4,
  },
  langPillActive: {
    backgroundColor: Colors.primaryGlow,
  },
  langFlag: {
    fontSize: 12,
  },
  langLabel: {
    fontSize: 11,
    fontWeight: '700' as const,
    color: Colors.textMuted,
    letterSpacing: 0.3,
  },
  langLabelActive: {
    color: Colors.primary,
  },
});
