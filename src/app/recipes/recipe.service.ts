import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //   new Recipe( 'A Tests Recipe', 'This is simply', 'https://www.bk.com/sites/default/files/PATTY_1800X760.mp4',
    //     [
    //       new Ingredient('Lettuce', 3),
    //       new Ingredient('noodles', 4)
    //     ]),
    //   new Recipe( 'Another Test Recipe', 'This is simply', 'https://www.bk.com/sites/default/files/PATTY_1800X760.mp4',
    //     [
    //       new Ingredient('Whole Burger', 40),
    //       new Ingredient('Pizza Slices', 500)
    //     ]),
    //
    //   new Recipe( 'BURGER', 'The best burger in all the world', 'https://www.bk.com/sites/default/files/PATTY_1800X760.mp4',
    //     [
    //       new Ingredient('Whole Burger', 40),
    //       new Ingredient('Pizza Slices', 500)
    //     ])
    // ];

    private recipes: Recipe[] = [];

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return [...this.recipes];
    }

    constructor(private shoppingListService: ShoppingListService) {
    }

    sendIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.refreshRecipeList();
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.refreshRecipeList();
    }

    private refreshRecipeList() {
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
