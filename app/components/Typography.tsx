import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { useThemeColor } from '@/app/hooks/useThemeColor';

// Using the existing SpaceMono font that's already in the project
// until the Playfair and Inter fonts are added

export type TypographyProps = TextProps & {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'small' | 'label';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
};

export function Typography({
                             style,
                             variant = 'body',
                             weight = 'regular',
                             color,
                             align = 'auto',
                             children,
                             ...rest
                           }: TypographyProps) {
  const textColor = color || useThemeColor({}, 'text');

  // For now, we'll use system fonts until the custom fonts are properly added
  // No need to check if fonts are loaded since we're using system fonts

  return (
    <Text
      style={[
        { color: textColor, textAlign: align },
        styles.base,
        variant === 'h1' && styles.h1,
        variant === 'h2' && styles.h2,
        variant === 'h3' && styles.h3,
        variant === 'body' && styles.body,
        variant === 'small' && styles.small,
        variant === 'label' && styles.label,
        weight === 'medium' && styles.medium,
        weight === 'semibold' && styles.semibold,
        weight === 'bold' && styles.bold,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: 'System',
  },
  h1: {
    // Using system fonts temporarily
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 34,
    lineHeight: 42,
    letterSpacing: 0.25,
    marginBottom: 12,
  },
  h2: {
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0.25,
    marginBottom: 10,
  },
  h3: {
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0.25,
    marginBottom: 8,
  },
  body: {
    fontFamily: 'System',
    fontSize: 16,
    lineHeight: 24,
  },
  small: {
    fontFamily: 'System',
    fontSize: 14,
    lineHeight: 20,
  },
  label: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
  },
  medium: {
    fontWeight: '500',
  },
  semibold: {
    fontWeight: '600',
  },
  bold: {
    fontWeight: 'bold',
  },
});