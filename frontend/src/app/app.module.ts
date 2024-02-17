import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './views/header/header.component';
import { RecipesComponent } from './views/recipes/recipes.component';
import { RecipeListComponent } from './views/recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './views/recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './views/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './views/shopping-list/shopping-edit/shopping-edit.component';
import { RecipeDetailComponent } from './views/recipes/recipe-detail/recipe-detail.component';
import { DropdownDirective } from './directive/dropdown.directive';
import { BuyDashboardComponent } from './views/buy-dashboard/buy-dashboard.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipeDetailComponent,
    DropdownDirective,
    BuyDashboardComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
