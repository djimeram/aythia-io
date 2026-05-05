import React, { useEffect, useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable, Animated, Platform } from 'react-native';
import { Stack, router } from 'expo-router';
import { ArrowLeft, Shield } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';
import { useLanguage } from '@/contexts/LanguageContext';
import AuroraBackground from '@/components/AuroraBackground';

export default function PrivacyPage() {
  const { t, writingDirection, textAlign, flexDirection, isRTL } = useLanguage();
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(slide, { toValue: 0, tension: 40, friction: 9, useNativeDriver: true }),
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

      <AuroraBackground intensity="soft" />

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
          <View style={styles.backBg} />
          <ArrowLeft size={18} color="#FFFFFF" strokeWidth={2.2} style={isRTL ? styles.flipIcon : undefined} />
          <Text style={[styles.backTxt, { writingDirection }]}>{t.privacy.back}</Text>
        </Pressable>

        <Animated.View style={{ opacity: fade, transform: [{ translateY: slide }] }}>
          <View style={styles.glassCard}>
            <View style={styles.cardBg} />
            <LinearGradient
              colors={['rgba(139,92,246,0.12)', 'rgba(34,211,238,0.06)', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
              pointerEvents="none"
            />
            <View style={styles.cardBorder} pointerEvents="none" />

            <View style={styles.cardInner}>
              <View style={[styles.badge, { flexDirection }]}>
                <LinearGradient
                  colors={['#8B5CF6', '#22D3EE']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={StyleSheet.absoluteFillObject}
                />
                <Shield size={14} color="#FFFFFF" strokeWidth={2.4} />
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
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingTop: Platform.OS === 'web' ? 40 : 64,
    paddingBottom: 80,
    paddingHorizontal: 16,
    maxWidth: 880,
    width: '100%',
    alignSelf: 'center' as const,
  },
  backBtn: {
    alignSelf: 'flex-start' as const,
    alignItems: 'center' as const,
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    marginBottom: 28,
    overflow: 'hidden' as const,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  backBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.06)',
    ...(Platform.OS === 'web' ? ({ backdropFilter: 'blur(20px)' } as object) : {}),
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
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  glassCard: {
    borderRadius: 28,
    overflow: 'hidden' as const,
    position: 'relative' as const,
  },
  cardBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20,20,40,0.55)',
    ...(Platform.OS === 'web' ? ({ backdropFilter: 'blur(28px) saturate(180%)' } as object) : {}),
  },
  cardBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cardInner: {
    padding: 32,
  },
  badge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
    alignSelf: 'flex-start' as const,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 20,
    overflow: 'hidden' as const,
  },
  badgeTxt: {
    fontSize: 11,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    letterSpacing: 1.6,
  },
  title: {
    fontSize: 40,
    lineHeight: 46,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    letterSpacing: -1.4,
  },
  updated: {
    marginTop: 12,
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '500' as const,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: 28,
  },
  intro: {
    fontSize: 16,
    lineHeight: 26,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '400' as const,
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    letterSpacing: -0.3,
    marginBottom: 10,
  },
  sectionBody: {
    fontSize: 15,
    lineHeight: 24,
    color: 'rgba(255,255,255,0.65)',
  },
  footer: {
    marginTop: 48,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center' as const,
    gap: 6,
  },
  footerTxt: {
    fontSize: 14,
    color: '#A78BFA',
    fontWeight: '700' as const,
  },
  copyright: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
  },
});
