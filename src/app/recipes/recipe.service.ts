import { Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe( 'A Test Recipe', 'This is simply', 'https://www.bk.com/sites/default/files/PATTY_1800X760.mp4',
      [
        new Ingredient('Lettuce', 3),
        new Ingredient('noodles', 4)
      ]),
    new Recipe( 'Another Test Recipe', 'This is simply', 'https://www.bk.com/sites/default/files/PATTY_1800X760.mp4',
      [
        new Ingredient('Whole Burger', 40),
        new Ingredient('Pizza Slices', 500)
      ]),

    new Recipe( 'BURGER', 'The best burger in all the world', 'https://www.bk.com/sites/default/files/PATTY_1800X760.mp4',
      [
        new Ingredient('Whole Burger', 40),
        new Ingredient('Pizza Slices', 500)
      ])
  ];
  getRecipes() {
    return [...this.recipes];
  }
  constructor(private shoppingListService: ShoppingListService) { }

  sendIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
  getRecipe(id: number) {
    return this.recipes[id];
  }
}
