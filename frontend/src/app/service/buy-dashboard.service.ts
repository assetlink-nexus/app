import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '../model/token';

@Injectable({ providedIn: 'root' })
export class BuyDashboardService {
  // recipeSelected = new EventEmitter<Recipe>();

  constructor(private http: HttpClient) {}

  getTokens(): Observable<Token[]> {
    return this.http.get<Token[]>('http://localhost:3000/getTokens');
    // .subscribe(data => {
    //   // this.totalAngularPackages = data.total;
    // });
  }

  // constructor(private slService: ShoppingListService) {}

  // private recipes: Recipe[] = [
  //   {
  //     name: 'first',
  //     desc: 'recipe1',
  //     imagePath: '/assets/img-1.webp',
  //     ingredients: [
  //       { name: 'pomelo', amount: 8 },
  //       { name: 'potato', amount: 3 },
  //     ],
  //   },
  //   {
  //     name: 'second',
  //     desc: 'recipe2',
  //     imagePath: '/assets/img-1.webp',
  //     ingredients: [
  //       { name: 'citrus', amount: 2 },
  //       { name: 'cucamber', amount: 4 },
  //     ],
  //   },
  //   {
  //     name: 'third',
  //     desc: 'recipe3',
  //     imagePath: '/assets/img-1.webp',
  //     ingredients: [
  //       { name: 'tomato', amount: 1 },
  //       { name: 'potato', amount: 1 },
  //     ],
  //   },
  // ];

  // getRecipes(): Recipe[] {
  //   return this.recipes.slice();
  // }

  // addIngredientsToShoppingList(ingredients: Ingredient[]) {
  //   this.slService.addIngredients(ingredients);
  // }
}
