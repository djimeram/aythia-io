import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';

interface Props {
  intensity?: 'normal' | 'soft' | 'intense';
}

export default function AuroraBackground({ intensity = 'normal' }: Props) {
  const orbA = useRef(new Animated.Value(0)).current;
  const orbB = useRef(new Animated.Value(0)).current;
  const orbC = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = (v: Animated.Value, dur: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(v, { toValue: 1, duration: dur, useNativeDriver: true }),
          Animated.timing(v, { toValue: 0, duration: dur, useNativeDriver: true }),
        ])
      ).start();
    loop(orbA, 7000);
    loop(orbB, 9000);
    loop(orbC, 11000);
  }, [orbA, orbB, orbC]);

  const mult = intensity === 'soft' ? 0.5 : intensity === 'intense' ? 1.2 : 1;

  const a = {
    transform: [
      { translateX: orbA.interpolate({ inputRange: [0, 1], outputRange: [-30, 30] }) },
      { translateY: orbA.interpolate({ inputRange: [0, 1], outputRange: [-20, 40] }) },
      { scale: orbA.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] }) },
    ],
    opacity: orbA.interpolate({ inputRange: [0, 1], outputRange: [0.5 * mult, 0.85 * mult] }),
  };
  const b = {
    transform: [
      { translateX: orbB.interpolate({ inputRange: [0, 1], outputRange: [40, -20] }) },
      { translateY: orbB.interpolate({ inputRange: [0, 1], outputRange: [30, -30] }) },
      { scale: orbB.interpolate({ inputRange: [0, 1], outputRange: [1.1, 0.9] }) },
    ],
    opacity: orbB.interpolate({ inputRange: [0, 1], outputRange: [0.4 * mult, 0.7 * mult] }),
  };
  const c = {
    transform: [
      { translateX: orbC.interpolate({ inputRange: [0, 1], outputRange: [-10, 50] }) },
      { translateY: orbC.interpolate({ inputRange: [0, 1], outputRange: [40, -10] }) },
      { scale: orbC.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1.15] }) },
    ],
    opacity: orbC.interpolate({ inputRange: [0, 1], outputRange: [0.35 * mult, 0.65 * mult] }),
  };

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: Colors.bgDeep }]} />
      <LinearGradient
        colors={['#0A0518', '#06060F', '#02020A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <Animated.View style={[styles.orbViolet, a]} />
      <Animated.View style={[styles.orbCyan, b]} />
      <Animated.View style={[styles.orbMagenta, c]} />
      <View style={styles.grid} />
      <View style={styles.vignette} />
    </View>
  );
}

const styles = StyleSheet.create({
  orbViolet: {
    position: 'absolute' as const,
    top: '5%',
    left: '-20%',
    width: 520,
    height: 520,
    borderRadius: 260,
    backgroundColor: '#7C3AED',
    ...(Platform.OS === 'web' ? ({ filter: 'blur(120px)' } as object) : {}),
    opacity: 0.6,
  },
  orbCyan: {
    position: 'absolute' as const,
    top: '35%',
    right: '-25%',
    width: 460,
    height: 460,
    borderRadius: 230,
    backgroundColor: '#0EA5E9',
    ...(Platform.OS === 'web' ? ({ filter: 'blur(110px)' } as object) : {}),
    opacity: 0.55,
  },
  orbMagenta: {
    position: 'absolute' as const,
    bottom: '-10%',
    left: '10%',
    width: 380,
    height: 380,
    borderRadius: 190,
    backgroundColor: '#DB2777',
    ...(Platform.OS === 'web' ? ({ filter: 'blur(100px)' } as object) : {}),
    opacity: 0.45,
  },
  grid: {
    ...StyleSheet.absoluteFillObject,
    ...(Platform.OS === 'web'
      ? ({
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        } as object)
      : {}),
  },
  vignette: {
    ...StyleSheet.absoluteFillObject,
    ...(Platform.OS === 'web'
      ? ({
          backgroundImage:
            'radial-gradient(ellipse at center, transparent 30%, rgba(2,2,8,0.7) 100%)',
        } as object)
      : { backgroundColor: 'rgba(2,2,8,0.15)' }),
  },
});
