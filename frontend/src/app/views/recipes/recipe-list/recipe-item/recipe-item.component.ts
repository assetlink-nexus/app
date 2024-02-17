import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from 'src/app/model/recipe';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) {}

  onSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
