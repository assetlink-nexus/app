import { Component } from '@angular/core';
import { Ingredient } from 'src/app/model/ingredient';
import { ShoppingListService } from 'src/app/service/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent {
  ingredients: Ingredient[];

  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
  }
}
