interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
}

interface Step {
  id: string;
  order: number;
  description: string;
}

interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  steps: Step[];
  imageUrl?: string;
  preparationTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  createdBy: string;
}

interface Cookbook {
  id: string;
  name: string;
  description: string;
  coverImage?: string;
  recipes: Recipe[];
  author: string;
  createdAt: Date;
}

export type { Ingredient, Step, Recipe, Cookbook };