import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
  View
} from 'react-native';
import { Typography } from './Typography';
import { useThemeColor } from '@/app/hooks/useThemeColor';

export type ButtonProps = TouchableOpacityProps & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  label: string;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export function Button({
                         style,
                         variant = 'primary',
                         size = 'medium',
                         label,
                         loading = false,
                         leftIcon,
                         rightIcon,
                         disabled,
                         ...rest
                       }: ButtonProps) {
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const backgroundColor = useThemeColor({}, 'background');
  const buttonTextColor = useThemeColor({}, 'buttonText');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');

  const getBackgroundColor = () => {
    if (disabled) return '#CCCCCC';

    switch (variant) {
      case 'primary':
        return primaryColor;
      case 'secondary':
        return secondaryColor;
      case 'outline':
      case 'ghost':
        return 'transparent';
      default:
        return primaryColor;
    }
  };

  const getTextColor = () => {
    if (disabled) return '#666666';

    switch (variant) {
      case 'primary':
      case 'secondary':
        return buttonTextColor;
      case 'outline':
      case 'ghost':
        return textColor;
      default:
        return buttonTextColor;
    }
  };

  const getBorderColor = () => {
    if (disabled) return '#CCCCCC';

    switch (variant) {
      case 'outline':
        return borderColor;
      default:
        return 'transparent';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.base,
        { backgroundColor: getBackgroundColor(), borderColor: getBorderColor() },
        variant === 'outline' && styles.outline,
        size === 'small' && styles.small,
        size === 'medium' && styles.medium,
        size === 'large' && styles.large,
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
      {...rest}
    >
      <View style={styles.content}>
        {leftIcon && !loading && <View style={styles.iconLeft}>{leftIcon}</View>}

        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'primary' || variant === 'secondary' ? buttonTextColor : primaryColor}
          />
        ) : (
          <Typography
            weight={variant === 'ghost' ? 'regular' : 'medium'}
            color={getTextColor()}
            style={size === 'small' ? { fontSize: 14 } : undefined}
          >
            {label}
          </Typography>
        )}

        {rightIcon && !loading && <View style={styles.iconRight}>{rightIcon}</View>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outline: {
    borderWidth: 1,
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  large: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  disabled: {
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});