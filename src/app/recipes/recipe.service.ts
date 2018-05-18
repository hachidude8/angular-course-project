import { /* EventEmitter, */ Injectable, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable()
export class RecipeService implements OnInit {

    // recipeSelected = new EventEmitter<Recipe>();

    recipesChanged = new Subject<Recipe[]>();

    /* private recipes: Recipe[] = [
        new Recipe('Some chicken stew',
            'Something about chicken',
            'https://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg',
            [
                new Ingredient('Chicken legs', 3),
                new Ingredient('Tomato sauce', 1),
                new Ingredient('Basil bush', 1)
            ]),
        new Recipe('A good ol\' schnitzel',
            'What else can you say, its a Schnitzel',
            'https://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-7_edited.jpg',
            [
                new Ingredient('Chicken meat', 3),
                new Ingredient('Lemon', 1)
            ])
    ]; */

    private recipes: Recipe[] = [];

    constructor(
        private slService: ShoppingListService
        // private sotrageService: DataStorageService
    ) {}

    ngOnInit() {
        // this.sotrageService.getRecipes();
    }

    getRecipes() {
        return this.recipes.slice();
        // The empty slice foreces the function to return
        // a copy of the array, so you can only access a copy of it
        // never the actual array, ! this will NOT update on change !
        // can be avoided by not using slice() or see other service
        // quite slick.
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.getRecipes());
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.getRecipes());
    }

    updateRecipe(i: number, newRecipe: Recipe) {
        this.recipes[i] = newRecipe;
        this.recipesChanged.next(this.getRecipes());
    }

    deleteRecipe(i: number) {
        this.recipes.splice(i, 1);
        this.recipesChanged.next(this.getRecipes());
    }
}
