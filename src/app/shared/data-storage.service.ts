import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private auth: AuthService
    ) {}

    storeRecipes() {
        const token = this.auth.getToken();

        // The return is on Observable for us to use,
        // you can skip it if you don't need it
        // You can also subscribe the result
        return this.http.put(
            'https://ng-recipebook-43f73.firebaseio.com/recipes.json',
            this.recipeService.getRecipes(),
            {
                params: {
                    auth: token
                }
            }
        );
    }

    getRecipes() {
        const token = this.auth.getToken();

        this.http.get(
            'https://ng-recipebook-43f73.firebaseio.com/recipes.json',
            {
                params: {
                    auth: token
                }
            }
        ).subscribe(
            // The response will be the type Recipe when we recieve it;
            (recipes: Recipe[]) => {
                for (const recipe of recipes) {
                    if (!recipe.ingredients) { recipe.ingredients = []; }
                }
                console.log(recipes);

                this.recipeService.setRecipes(recipes);
            }
        );
    }

}
