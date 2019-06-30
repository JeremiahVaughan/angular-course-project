import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply', 'https://www.gimmesomeoven.com/' +
      'wp-content/uploads/2014/03/Cajun-Jambalaya-Recipe-with-Andouille-Sausage-Shrimp-and-Chicken-3-1.jpg',
      [
        new Ingredient('Lettuce', 3),
        new Ingredient('noodles', 4)
      ]),
    new Recipe('Another Test Recipe', 'This is simply', 'https://www.drdavidludwig.com/' +
      'wp-content/uploads/2017/01/1-RIS_6IbCLYv1X3bzYW1lmA.jpeg',
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
}
