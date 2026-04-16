import React, { useRef, useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import RideFlowSection from '@/components/RideFlowSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import DownloadSection from '@/components/DownloadSection';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function AythiaShowcasePage() {
  const ref = useRef<ScrollView>(null);
  const fy = useRef(0);
  const go = useCallback(() => ref.current?.scrollTo({ y: fy.current, animated: true }), []);

  return (
    <View style={p.r}>
      <LanguageSwitcher />
      <ScrollView ref={ref} style={p.s} contentContainerStyle={p.c} showsVerticalScrollIndicator={false} scrollEventThrottle={16} bounces>
        <HeroSection onScrollToFeatures={go} />
        <View onLayout={e => { fy.current = e.nativeEvent.layout.y; }}>
          <FeaturesSection />
        </View>
        <RideFlowSection />
        <TestimonialsSection />
        <DownloadSection />
      </ScrollView>
    </View>
  );
}

const p = StyleSheet.create({ r: { flex: 1, backgroundColor: '#F7F5F2' }, s: { flex: 1 }, c: { flexGrow: 1 } });
