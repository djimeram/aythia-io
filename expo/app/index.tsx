import React, { useRef, useCallback, useMemo, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Animated, Platform } from 'react-native';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import RideFlowSection from '@/components/RideFlowSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import DownloadSection from '@/components/DownloadSection';
import Navbar from '@/components/Navbar';
import AuroraBackground from '@/components/AuroraBackground';

export default function AythiaShowcasePage() {
  const scrollRef = useRef<ScrollView>(null);
  const featuresY = useRef(0);
  const scrollY = useMemo(() => new Animated.Value(0), []);

  const scrollToFeatures = useCallback(() => {
    scrollRef.current?.scrollTo({ y: featuresY.current, animated: true });
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const style = document.createElement('style');
    style.textContent = `
      ::selection { background: rgba(139,92,246,0.4); color: #fff; }
      ::-webkit-scrollbar { width: 8px; height: 8px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #8B5CF6, #22D3EE);
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #A78BFA, #67E8F9); }
      html { scroll-behavior: smooth; }
      body { background: #06060F; }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <View style={styles.root}>
      <AuroraBackground />
      <Navbar scrollY={scrollY} onNavigate={() => {}} />
      <Animated.ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        bounces
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <HeroSection onScrollToFeatures={scrollToFeatures} scrollY={scrollY} />
        <View onLayout={e => { featuresY.current = e.nativeEvent.layout.y; }}>
          <FeaturesSection />
        </View>
        <RideFlowSection />
        <TestimonialsSection />
        <DownloadSection />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#06060F',
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});
