import React from 'react';
import { View, StyleSheet, Platform, ViewStyle, StyleProp } from 'react-native';
import { Colors } from '@/constants/colors';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  glowColor?: string;
  borderColor?: string;
}

export default function GlassCard({ children, style, glowColor, borderColor }: Props) {
  return (
    <View
      style={[
        styles.card,
        glowColor
          ? {
              shadowColor: glowColor,
              shadowOpacity: 0.5,
              shadowRadius: 28,
              shadowOffset: { width: 0, height: 12 },
            }
          : null,
        borderColor ? { borderColor } : null,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceGlass,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.borderStrong,
    overflow: 'hidden' as const,
    ...(Platform.OS === 'web'
      ? ({
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        } as object)
      : {}),
  },
});
