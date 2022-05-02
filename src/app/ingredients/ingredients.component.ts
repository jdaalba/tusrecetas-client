import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {IngredientService} from "../ingredient.service";
import {ingredient} from "../classes/ingredient";
import {result} from "../classes/result";

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  private _ingredients: BehaviorSubject<any[]> = new BehaviorSubject<ingredient[]>([]);

  public readonly ingredients: Observable<ingredient[]> = this._ingredients.asObservable();

  private readonly url: string = `http://localhost:8080/ingredients`;

  constructor(private http: HttpClient, public service: IngredientService) {
  }

  ngOnInit(): void {
  }

  loadIngredients(): void {
    let element = document.getElementById("ing_query");
    if (element) {
      // @ts-ignore
      const hint = element.value;
      let url = this.url + (hint ? `?like=${hint}` : "");
      this.http.get<result<ingredient>>(url)
      .pipe(map(o => o.data))
      .pipe(map(o => this.removeSelectedIngredients(o)))
      .subscribe(rs => this._ingredients.next(rs));
    }
  }

  private removeSelectedIngredients(data: ingredient[]): ingredient[] {
    let selIngs: ingredient[] = this.service._selectedIngredients.getValue();
    return data.filter(i => !selIngs.includes(i))
  }

  addIngredient(ingredient: ingredient): void {
    const current: ingredient[] = this.service._selectedIngredients.getValue();
    current.push(ingredient);
    this.service._selectedIngredients.next(current);

    // clear input
    // @ts-ignore
    document.getElementById("ing_query").value = "";

    // clear results
    this._ingredients.next([]);
  }

  remove(ingredient: ingredient): void {
    let node = document.getElementById(ingredient.id);
    if (node) {
      node.remove()
    }
  }

  unselect(ingredient: ingredient): void {
    const current = this.service._selectedIngredients.getValue();
    this.service._selectedIngredients.next(current.filter(i => i.id != ingredient.id));
  }
}
