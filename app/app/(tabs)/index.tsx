import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { Typography } from '@/app/components/Typography';
import { Button } from '@/app/components/Button';
import { RecipeCard } from '@/app/components/RecipeCard';
import { ThemedView } from '@/app/components/ThemedView';
import { Tag } from '@/app/components/Tag';
import { useColorScheme } from '@/app/hooks/useColorScheme';
import { IconSymbol } from '@/app/components/ui/IconSymbol';
import { Recipe } from '@/app/types';

// Mock recipe data
const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Classic Old Fashioned',
    description: 'A timeless cocktail made with bourbon, sugar, and bitters',
    ingredients: [
      { id: '1', name: 'Bourbon', amount: 2, unit: 'oz' },
      { id: '2', name: 'Sugar cube', amount: 1, unit: '' },
      { id: '3', name: 'Angostura bitters', amount: 2, unit: 'dashes' },
    ],
    steps: [
      { id: '1', order: 1, description: 'Place sugar cube in glass and saturate with bitters' },
      { id: '2', order: 2, description: 'Add bourbon and stir' },
      { id: '3', order: 3, description: 'Add ice and garnish with orange peel' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3',
    preparationTime: 5,
    difficulty: 'easy',
    createdBy: 'System',
  },
  {
    id: '2',
    name: 'Gin & Tonic',
    description: 'A refreshing highball cocktail with gin and tonic water',
    ingredients: [
      { id: '1', name: 'Gin', amount: 2, unit: 'oz' },
      { id: '2', name: 'Tonic Water', amount: 4, unit: 'oz' },
      { id: '3', name: 'Lime wedge', amount: 1, unit: '' },
    ],
    steps: [
      { id: '1', order: 1, description: 'Fill a highball glass with ice' },
      { id: '2', order: 2, description: 'Add gin and top with tonic water' },
      { id: '3', order: 3, description: 'Garnish with lime wedge' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1563223771-375783ee91ad?ixlib=rb-4.0.3',
    preparationTime: 3,
    difficulty: 'easy',
    createdBy: 'System',
  },
  {
    id: '3',
    name: 'Espresso Martini',
    description: 'A rich, indulgent cocktail with vodka, coffee liqueur, and fresh espresso',
    ingredients: [
      { id: '1', name: 'Vodka', amount: 1.5, unit: 'oz' },
      { id: '2', name: 'Coffee liqueur', amount: 1, unit: 'oz' },
      { id: '3', name: 'Espresso shot', amount: 1, unit: '' },
    ],
    steps: [
      { id: '1', order: 1, description: 'Add all ingredients to a shaker with ice' },
      { id: '2', order: 2, description: 'Shake vigorously for 10-15 seconds' },
      { id: '3', order: 3, description: 'Double strain into a chilled martini glass' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1595968822095-3d587ece5db0?ixlib=rb-4.0.3',
    preparationTime: 8,
    difficulty: 'medium',
    createdBy: 'System',
  },
  {
    id: '4',
    name: 'Whiskey Sour',
    description: 'A perfectly balanced cocktail with whiskey, lemon juice, and simple syrup',
    ingredients: [
      { id: '1', name: 'Bourbon', amount: 2, unit: 'oz' },
      { id: '2', name: 'Fresh lemon juice', amount: 0.75, unit: 'oz' },
      { id: '3', name: 'Simple syrup', amount: 0.75, unit: 'oz' },
    ],
    steps: [
      { id: '1', order: 1, description: 'Add all ingredients to a shaker with ice' },
      { id: '2', order: 2, description: 'Shake well until chilled' },
      { id: '3', order: 3, description: 'Strain into a rocks glass with fresh ice' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3',
    preparationTime: 5,
    difficulty: 'easy',
    createdBy: 'System',
  },
];

// Categories for filtering
const categories = [
  'All',
  'Whiskey',
  'Gin',
  'Vodka',
  'Rum',
  'Tequila'
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter recipes (in a real app, this would filter based on ingredients)
  const filteredRecipes = selectedCategory === 'All'
    ? mockRecipes
    : mockRecipes.filter(recipe =>
      recipe.ingredients.some(ing =>
        ing.name.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      <View style={styles.header}>
        <Typography variant="h1">Mixology</Typography>
        <Button
          size="small"
          variant="outline"
          label="Search"
          rightIcon={<IconSymbol name="house.fill" size={16} color="#5B4B8A" />}
        />
      </View>

      {/* Category filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map(category => (
          <Tag
            key={category}
            label={category}
            style={[
              styles.categoryTag,
              selectedCategory === category && styles.selectedCategory
            ]}
            onTouchEnd={() => setSelectedCategory(category)}
          />
        ))}
      </ScrollView>

      <Typography variant="h2" style={styles.sectionTitle}>Featured Cocktails</Typography>

      {/* Featured cocktail */}
      <RecipeCard recipe={mockRecipes[0]} variant="horizontal" style={styles.featuredCard} />

      <Typography variant="h2" style={styles.sectionTitle}>Popular Recipes</Typography>

      {/* Recipe grid */}
      <FlatList
        data={filteredRecipes}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.recipeGrid}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.recipesContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingBottom: 16,
  },
  categoryTag: {
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: '#5B4B8A',
  },
  sectionTitle: {
    marginBottom: 12,
  },
  featuredCard: {
    width: '100%',
    marginBottom: 24,
  },
  recipesContainer: {
    paddingBottom: 80,
  },
  recipeGrid: {
    justifyContent: 'space-between',
  }
});