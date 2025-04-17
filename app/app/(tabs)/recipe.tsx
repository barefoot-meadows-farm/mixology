import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams, router } from 'expo-router';

import { Typography } from '@/app/components/Typography';
import { Button } from '@/app/components/Button';
import { Tag } from '@/app/components/Tag';
import { IconSymbol } from '@/app/components/ui/IconSymbol';
import { useThemeColor } from '@/app/hooks/useThemeColor';
import { Recipe } from '@/app/types';

// Mock data to find matching recipe
const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Classic Old Fashioned',
    description: 'A timeless cocktail made with bourbon, sugar, and bitters',
    ingredients: [
      { id: '1', name: 'Bourbon', amount: 2, unit: 'oz' },
      { id: '2', name: 'Sugar cube', amount: 1, unit: '' },
      { id: '3', name: 'Angostura bitters', amount: 2, unit: 'dashes' },
      { id: '4', name: 'Orange peel', amount: 1, unit: '' },
    ],
    steps: [
      { id: '1', order: 1, description: 'Place sugar cube in glass and saturate with bitters, add a dash of plain water.' },
      { id: '2', order: 2, description: 'Muddle until dissolved.' },
      { id: '3', order: 3, description: 'Add bourbon and stir.' },
      { id: '4', order: 4, description: 'Add a large ice cube and stir again.' },
      { id: '5', order: 5, description: 'Garnish with orange peel, optionally expressing the oils before placing it in the glass.' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3',
    preparationTime: 5,
    difficulty: 'easy',
    createdBy: 'System',
  },
  // Other recipes would be here
];

export default function RecipeDetailScreen() {
  const params = useLocalSearchParams();
  const recipeId = params.id as string;

  // Find matching recipe
  const recipe = mockRecipes.find(r => r.id === recipeId) || mockRecipes[0];

  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');
  const borderColor = useThemeColor({}, 'border');

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <IconSymbol name="chevron.right" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.favoriteButton}>
              <IconSymbol name="house.fill" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Recipe Image */}
        <View style={styles.imageContainer}>
          {recipe.imageUrl ? (
            <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
          ) : (
            <View style={[styles.placeholderImage, { backgroundColor: primaryColor }]} />
          )}

          {/* Overlay gradient on image */}
          <View style={styles.imageOverlay} />
        </View>

        {/* Recipe Content */}
        <View style={styles.contentContainer}>
          {/* Recipe Info */}
          <View style={styles.recipeInfo}>
            <Typography variant="h1">{recipe.name}</Typography>
            <Typography variant="body" style={styles.description}>
              {recipe.description}
            </Typography>

            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <IconSymbol name="house.fill" size={16} color={textColor} />
                <Typography variant="small" weight="medium">
                  {recipe.preparationTime} mins
                </Typography>
              </View>

              <Tag
                label={recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
                style={[
                  styles.difficultyTag,
                  {
                    backgroundColor:
                      recipe.difficulty === 'easy' ? '#A8E6CF' :
                        recipe.difficulty === 'medium' ? '#FFD3B6' : '#FFAAA5'
                  }
                ]}
              />
            </View>
          </View>

          {/* Ingredients */}
          <View style={styles.sectionContainer}>
            <Typography variant="h2">Ingredients</Typography>
            {recipe.ingredients.map((ingredient) => (
              <View key={ingredient.id} style={styles.ingredientItem}>
                <Typography variant="body" weight="medium">
                  {ingredient.amount} {ingredient.unit}
                </Typography>
                <Typography variant="body">{ingredient.name}</Typography>
              </View>
            ))}
          </View>

          {/* Steps */}
          <View style={styles.sectionContainer}>
            <Typography variant="h2">Instructions</Typography>
            {recipe.steps.map((step) => (
              <View key={step.id} style={styles.stepItem}>
                <View style={[styles.stepNumber, { backgroundColor: primaryColor }]}>
                  <Typography variant="small" weight="bold" color="white">
                    {step.order}
                  </Typography>
                </View>
                <Typography variant="body" style={styles.stepText}>
                  {step.description}
                </Typography>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom actions */}
      <SafeAreaView edges={['bottom']} style={styles.bottomBar}>
        <Button
          label="Start Mixing"
          variant="primary"
          style={styles.mixButton}
          leftIcon={<IconSymbol name="house.fill" size={20} color="white" />}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 300,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  recipeInfo: {
    marginTop: 20,
    marginBottom: 30,
  },
  description: {
    marginTop: 8,
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    gap: 5,
  },
  difficultyTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sectionContainer: {
    marginBottom: 30,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepText: {
    flex: 1,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  mixButton: {
    width: '100%',
  }
});