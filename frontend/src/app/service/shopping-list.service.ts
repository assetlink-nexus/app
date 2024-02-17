import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../model/ingredient';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  //   ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    { name: 'Apples', amount: 5 },
    { name: 'Tomatoes', amount: 10 },
  ];

  getIngredients(): Ingredient[] {
    // return this.ingredients.slice();
    return this.ingredients;
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.ingredients.push(ingredient);
    // }
    this.ingredients.push(...ingredients);
  }
}
