import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";

import {IngredientService} from "../ingredient.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  private _recipes: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  public readonly recipes: Observable<string[]> = this._recipes.asObservable();

  constructor(private http: HttpClient, public service: IngredientService) {
    this.service._selectedIngredients.subscribe(xs => this.findRecipes(xs, this.http));
  }

  ngOnInit(): void {
  }

  findRecipes(ingredients: string[], client: HttpClient): void {
    this._recipes.next([]);
    if (ingredients.length > 0) {
      client.get<any>(`http://localhost:8080/recipes?ingredients=${ingredients}`)
      .pipe(
        map(e => e.data.map((r: { name: any; }) => r.name))
      )
      .subscribe(rs => this._recipes.next(rs));
    }
  }
}
