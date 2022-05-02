import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";

import {IngredientService} from "../ingredient.service";
import {ingredient} from "../classes/ingredient";
import {result} from "../classes/result";
import {recipe} from "../classes/recipe";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  private _recipes: BehaviorSubject<recipe[]> = new BehaviorSubject<recipe[]>([]);

  public readonly recipes: Observable<recipe[]> = this._recipes.asObservable();

  constructor(private http: HttpClient, public service: IngredientService) {
    this.service._selectedIngredients.subscribe(xs => this.findRecipes(xs, this.http));
  }

  ngOnInit(): void {
  }

  findRecipes(ingredients: ingredient[], client: HttpClient): void {
    this._recipes.next([]);
    if (ingredients.length > 0) {
      const ids: string = ingredients.map(i => i.id).reduce((o, n) => o + ',' + n)
      client.get<result<recipe>>(`http://localhost:8080/recipes?ingredients=${ids}`)
      .pipe(
        map(e => {
          const recipes = e.data;
          recipes.forEach(r => r.ingredients.forEach(ingredient => {
            ingredient._selected = (document.getElementById(ingredient.id) != null);
          }))
          return recipes;
        }))
      .subscribe(rs => {
        console.log(rs);
        this._recipes.next(rs)
      });
    }
  }
}
