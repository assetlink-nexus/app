import { Component, Input } from '@angular/core';
import { Recipe } from 'src/app/model/recipe';
import { ShoppingListService } from 'src/app/service/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe;

  constructor(private slService: ShoppingListService) {}

  onAddToShoppingList() {
    this.slService.addIngredients(this.recipe.ingredients);
  }
}
