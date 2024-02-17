import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../model/recipe';
import { Ingredient } from '../model/ingredient';
import { ShoppingListService } from './shopping-list.service';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  constructor(private slService: ShoppingListService) {}

  private recipes: Recipe[] = [
    {
      name: 'first',
      desc: 'recipe1',
      imagePath: '/assets/img-1.webp',
      ingredients: [
        { name: 'pomelo', amount: 8 },
        { name: 'potato', amount: 3 },
      ],
    },
    {
      name: 'second',
      desc: 'recipe2',
      imagePath: '/assets/img-1.webp',
      ingredients: [
        { name: 'citrus', amount: 2 },
        { name: 'cucamber', amount: 4 },
      ],
    },
    {
      name: 'third',
      desc: 'recipe3',
      imagePath: '/assets/img-1.webp',
      ingredients: [
        { name: 'tomato', amount: 1 },
        { name: 'potato', amount: 1 },
      ],
    },
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
