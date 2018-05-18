import { Ingredient } from '../shared/ingredient.model';
// import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();
    // this event will inform that the ingredients array was updated
    // thus updating our getter that is using slice();

    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5)
    ];

    constructor() {
    }

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.getIngredients());
    }

    addIngredients(ingredients: Ingredient[]) {
        // you counl also make a for loop, but it would be heavy
        // on the system due to event emitters.

        this.ingredients.push(...ingredients);
        // this is a ES6 annotation that "spreads" the array
        // extracts them from the array and returns all the objects in it
        // wow just wow, read MDN for details
        this.ingredientsChanged.next(this.getIngredients());
    }

    getIngredient(i: number) {
        return this.ingredients[i];
    }

    updateIngredient(i: number, ingredient: Ingredient) {
        this.ingredients[i] = ingredient;
        this.ingredientsChanged.next(this.getIngredients());
    }

    deleteIngredient(i: number) {
        this.ingredients.splice(i, 1);
        this.ingredientsChanged.next(this.getIngredients());
    }

}
