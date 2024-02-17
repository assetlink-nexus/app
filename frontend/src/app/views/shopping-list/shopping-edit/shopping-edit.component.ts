import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/model/ingredient';
import { ShoppingListService } from 'src/app/service/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent {
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  ingredient: Ingredient = new Ingredient();

  constructor(private slService: ShoppingListService) {}

  onAddItem() {
    this.slService.addIngredient(this.ingredient);
  }
}
