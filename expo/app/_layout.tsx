import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState, useMemo } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Animated, Platform } from "react-native";
import { LanguageProvider } from "@/contexts/LanguageContext";

SplashScreen.preventAutoHideAsync();

const BG = '#F7F5F2';

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: BG }, animation: Platform.OS === 'web' ? 'none' : 'fade' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const fade = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    (async () => {
      console.log('[Aythia] init');
      await new Promise<void>(r => setTimeout(r, 100));
      setReady(true);
      await SplashScreen.hideAsync();
      Animated.timing(fade, { toValue: 1, duration: 400, useNativeDriver: true }).start();
    })();
  }, [fade]);

  if (!ready) return <View style={s.b} />;

  return (
    <QueryClientProvider client={new QueryClient()}>
      <LanguageProvider>
        <GestureHandlerRootView style={s.b}>
          <Animated.View style={[s.b, { opacity: fade }]}>
            <StatusBar style="dark" />
            <RootLayoutNav />
          </Animated.View>
        </GestureHandlerRootView>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

const s = StyleSheet.create({ b: { flex: 1, backgroundColor: BG } });
