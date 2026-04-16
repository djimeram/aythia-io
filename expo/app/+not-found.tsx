import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View, Animated, Pressable, useWindowDimensions } from "react-native";
import { MapPin, ArrowLeft } from "lucide-react-native";
import React, { useEffect, useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function NotFoundScreen() {
  const { width } = useWindowDimensions();
  const pulseAnim = useMemo(() => new Animated.Value(1), []);
  const fadeAnim = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    console.log("[Aythia Showcase] 404 page loaded, width:", width);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1400,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim, fadeAnim, width]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={notFoundStyles.container} testID="not-found-screen">
        <LinearGradient
          colors={['rgba(232,168,56,0.06)', 'transparent']}
          style={notFoundStyles.ambientGlow}
        />
        <Animated.View style={[notFoundStyles.contentWrap, { opacity: fadeAnim }]}>
          <Animated.View
            style={[
              notFoundStyles.iconOuter,
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <View style={notFoundStyles.iconInner}>
              <MapPin size={32} color={'#E8A838'} strokeWidth={1.8} />
            </View>
          </Animated.View>

          <Text style={notFoundStyles.title}>Destination not found</Text>
          <Text style={notFoundStyles.description}>
            This route isn't on the Aythia map yet.{'\n'}Let's navigate you back.
          </Text>

          <Link href="/" asChild>
            <Pressable
              style={({ pressed }) => [
                notFoundStyles.backButton,
                pressed && notFoundStyles.backButtonPressed,
              ]}
              testID="back-to-aythia"
            >
              <ArrowLeft size={18} color={'#080706'} strokeWidth={2.5} />
              <Text style={notFoundStyles.backButtonText}>Back to Aythia</Text>
            </Pressable>
          </Link>
        </Animated.View>
      </View>
    </>
  );
}

const notFoundStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080706',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  ambientGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  contentWrap: {
    alignItems: 'center',
    gap: 14,
  },
  iconOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(232,168,56,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(232,168,56,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(232,168,56,0.2)',
  },
  title: {
    fontSize: 28,
    fontWeight: '800' as const,
    color: '#FAF8F0',
    textAlign: 'center' as const,
    letterSpacing: -0.8,
  },
  description: {
    fontSize: 15,
    color: '#8A857E',
    textAlign: 'center' as const,
    lineHeight: 23,
    maxWidth: 300,
  },
  backButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
    marginTop: 22,
    backgroundColor: '#E8A838',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 18,
  },
  backButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#080706',
    letterSpacing: 0.2,
  },
});
