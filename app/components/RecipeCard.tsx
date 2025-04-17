import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
  Dimensions
} from 'react-native';
import { IconSymbol } from '@/app/components/ui/IconSymbol';
import { useThemeColor } from '@/app/hooks/useThemeColor';
import { Typography } from './Typography';
import { Tag } from './Tag';
import { Recipe } from '@/app/types';
import { router } from 'expo-router';

interface RecipeCardProps extends TouchableOpacityProps {
  recipe: Recipe;
  variant?: 'vertical' | 'horizontal';
}

export function RecipeCard({
                             recipe,
                             variant = 'vertical',
                             style,
                             ...rest
                           }: RecipeCardProps) {
  const cardBackgroundColor = useThemeColor({}, 'cardBackground');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');

  const handlePress = () => {
    router.push(`/recipe/${recipe.id}`);
  };

  const getDifficultyColor = () => {
    switch(recipe.difficulty) {
      case 'easy':
        return '#A8E6CF'; // Light green
      case 'medium':
        return '#FFD3B6'; // Light orange
      case 'hard':
        return '#FFAAA5'; // Light red
      default:
        return '#A8E6CF';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: cardBackgroundColor },
        variant === 'horizontal' && styles.horizontalContainer,
        style
      ]}
      onPress={handlePress}
      activeOpacity={0.9}
      {...rest}
    >
      <View style={[
        styles.imageContainer,
        variant === 'horizontal' && styles.horizontalImageContainer
      ]}>
        {recipe.imageUrl ? (
          <Image
            source={{ uri: recipe.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.placeholderImage, { backgroundColor: primaryColor }]}>
            <IconSymbol name="house.fill" size={32} color="white" />
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Typography variant="h3" numberOfLines={2}>{recipe.name}</Typography>
        <Typography variant="small" numberOfLines={2} color="#666">
          {recipe.description}
        </Typography>

        <View style={styles.metaContainer}>
          <View style={styles.timeContainer}>
            <IconSymbol name="house.fill" size={14} color={textColor} />
            <Typography variant="small" weight="medium">
              {recipe.preparationTime} mins
            </Typography>
          </View>

          <Tag
            label={recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
            style={{ backgroundColor: getDifficultyColor() }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 24; // Account for padding

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    width: cardWidth,
    marginBottom: 16,
  },
  horizontalContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 120,
  },
  imageContainer: {
    width: '100%',
    height: 140,
  },
  horizontalImageContainer: {
    width: 100,
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 12,
    flex: 1,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});