import React, { useRef, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import { Globe } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/constants/translations';
import { Colors } from '@/constants/colors';

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'ar', label: 'عر', flag: '🇸🇦' },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideDown = useRef(new Animated.Value(-10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, { toValue: 1, duration: 500, delay: 600, useNativeDriver: true }),
      Animated.timing(slideDown, { toValue: 0, duration: 500, delay: 600, useNativeDriver: true }),
    ]).start();
  }, [fadeIn, slideDown]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn, transform: [{ translateY: slideDown }] }]}>
      <Globe size={14} color={Colors.textMuted} strokeWidth={2} />
      <View style={styles.pills}>
        {LANGUAGES.map((lang) => {
          const isActive = language === lang.code;
          return (
            <Pressable
              key={lang.code}
              onPress={() => setLanguage(lang.code)}
              style={({ pressed }) => [
                styles.pill,
                isActive && styles.pillActive,
                pressed && styles.pillPressed,
              ]}
              testID={`lang-${lang.code}`}
            >
              <Text style={styles.flag}>{lang.flag}</Text>
              <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                {lang.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute' as const,
    top: 52,
    right: 16,
    zIndex: 100,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 28,
    paddingVertical: 6,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(28,25,23,0.05)',
  },
  pills: {
    flexDirection: 'row' as const,
    gap: 4,
  },
  pill: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 18,
    gap: 5,
  },
  pillActive: {
    backgroundColor: 'rgba(232,105,46,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(232,105,46,0.2)',
  },
  pillPressed: {
    opacity: 0.7,
  },
  flag: {
    fontSize: 13,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700' as const,
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  pillTextActive: {
    color: Colors.primary,
  },
});
