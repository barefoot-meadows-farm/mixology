import React from 'react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (id: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <div 
      className="recipe-card"
      onClick={() => onClick(recipe.id)}
    >
      {recipe.imageUrl && (
        <img src={recipe.imageUrl} alt={recipe.name} className="recipe-image" />
      )}
      <div className="recipe-content">
        <h3>{recipe.name}</h3>
        <p>{recipe.description}</p>
        <div className="recipe-meta">
          <span>{recipe.preparationTime} mins</span>
          <span className={`difficulty ${recipe.difficulty}`}>
            {recipe.difficulty}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;