import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { Typography } from './Typography';
import { useThemeColor } from '@/app/hooks/useThemeColor';

export type TagProps = ViewProps & {
  label: string;
  variant?: 'standard' | 'timed' | 'category';
  icon?: React.ReactNode;
};

export function Tag({
                      style,
                      label,
                      variant = 'standard',
                      icon,
                      ...rest
                    }: TagProps) {
  const tagBackgroundColor = useThemeColor({}, 'tag');
  const tagTextColor = useThemeColor({}, 'tag');

  return (
    <View
      style={[
        styles.base,
        { backgroundColor: tagBackgroundColor },
        variant === 'timed' && styles.timed,
        variant === 'category' && styles.category,
        style,
      ]}
      {...rest}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <Typography
        variant="small"
        weight="medium"
        color={tagTextColor}
      >
        {label}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  timed: {
    borderRadius: 12,
  },
  category: {
    borderRadius: 6,
  },
  icon: {
    marginRight: 6,
  }
});