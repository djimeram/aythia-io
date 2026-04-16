import React, { useRef, useCallback, useMemo } from 'react';
import { ScrollView, StyleSheet, View, Animated } from 'react-native';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import RideFlowSection from '@/components/RideFlowSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import DownloadSection from '@/components/DownloadSection';
import Navbar from '@/components/Navbar';

export default function AythiaShowcasePage() {
  const scrollRef = useRef<ScrollView>(null);
  const featuresY = useRef(0);
  const scrollY = useMemo(() => new Animated.Value(0), []);

  const scrollToFeatures = useCallback(() => {
    scrollRef.current?.scrollTo({ y: featuresY.current, animated: true });
  }, []);

  return (
    <View style={styles.root}>
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
        <HeroSection onScrollToFeatures={scrollToFeatures} />
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
    backgroundColor: '#FAFAF9',
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});
