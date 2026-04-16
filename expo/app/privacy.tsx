import React, { useEffect, useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable, Animated, Platform } from 'react-native';
import { Stack, router } from 'expo-router';
import { ArrowLeft, Shield } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PrivacyPage() {
  const { t, writingDirection, textAlign, flexDirection, isRTL } = useLanguage();
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, [fade, slide]);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false, title: t.privacy.title }} />

      <LinearGradient
        colors={[ '#FFF7ED', '#FAFAF9', '#FAFAF9' ]}
        style={styles.bgGradient}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={handleBack}
          style={({ pressed }) => [styles.backBtn, { flexDirection }, pressed && styles.backPressed]}
          testID="privacy-back"
        >
          <ArrowLeft size={18} color={Colors.text} strokeWidth={2.2} style={isRTL ? styles.flipIcon : undefined} />
          <Text style={[styles.backTxt, { writingDirection }]}>{t.privacy.back}</Text>
        </Pressable>

        <Animated.View style={{ opacity: fade, transform: [{ translateY: slide }] }}>
          <View style={styles.badge}>
            <Shield size={14} color={Colors.primary} strokeWidth={2.4} />
            <Text style={[styles.badgeTxt, { writingDirection }]}>Aythia</Text>
          </View>

          <Text style={[styles.title, { textAlign, writingDirection }]}>{t.privacy.title}</Text>
          <Text style={[styles.updated, { textAlign, writingDirection }]}>{t.privacy.updated}</Text>

          <View style={styles.divider} />

          <Text style={[styles.intro, { textAlign, writingDirection }]}>{t.privacy.intro}</Text>

          {t.privacy.sections.map((s, i) => (
            <View key={`sec-${i}`} style={styles.section}>
              <Text style={[styles.sectionTitle, { textAlign, writingDirection }]}>{s.title}</Text>
              <Text style={[styles.sectionBody, { textAlign, writingDirection }]}>{s.body}</Text>
            </View>
          ))}

          <View style={styles.footer}>
            <Text style={[styles.footerTxt, { textAlign: 'center' as const, writingDirection }]}>
              privacy@aythia.app
            </Text>
            <Text style={[styles.copyright, { textAlign: 'center' as const, writingDirection }]}>
              © 2026 Aythia
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  bgGradient: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    height: 360,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingTop: Platform.OS === 'web' ? 40 : 64,
    paddingBottom: 80,
    paddingHorizontal: 20,
    maxWidth: 820,
    width: '100%',
    alignSelf: 'center' as const,
  },
  backBtn: {
    alignSelf: 'flex-start' as const,
    alignItems: 'center' as const,
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 28,
  },
  backPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
  flipIcon: {
    transform: [{ scaleX: -1 }],
  },
  backTxt: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.text,
    letterSpacing: -0.2,
  },
  badge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
    alignSelf: 'flex-start' as const,
    backgroundColor: Colors.primaryGlow,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  badgeTxt: {
    fontSize: 11,
    fontWeight: '800' as const,
    color: Colors.primary,
    letterSpacing: 1.2,
  },
  title: {
    fontSize: 40,
    lineHeight: 46,
    fontWeight: '900' as const,
    color: Colors.text,
    letterSpacing: -1.2,
  },
  updated: {
    marginTop: 10,
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: '500' as const,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 28,
  },
  intro: {
    fontSize: 16,
    lineHeight: 26,
    color: Colors.textSecondary,
    fontWeight: '400' as const,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800' as const,
    color: Colors.text,
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  sectionBody: {
    fontSize: 15,
    lineHeight: 24,
    color: Colors.textSecondary,
  },
  footer: {
    marginTop: 48,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    alignItems: 'center' as const,
    gap: 6,
  },
  footerTxt: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '700' as const,
  },
  copyright: {
    fontSize: 12,
    color: Colors.textMuted,
  },
});
