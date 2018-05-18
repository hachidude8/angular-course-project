import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // const id = this.currentRoute.snapshot.params['id'];
    // works only once, on load

    this.currentRoute.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          // what you recieve is a string, the '+' casts it to number
          // just wow

          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
  }

  onAddToShoppingList() {
    this.recipeService
      .addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.currentRoute});

    // alternavite, just in case of need the id gives out trouble
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.currentRoute});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
