import { Component, OnInit, Input, EventEmitter, /* Output */ } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  /* You have to bind this property from the outside */
  @Input() recipe: Recipe;
  @Input() index: number;

  // @Output() recipeSelected = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }



}
