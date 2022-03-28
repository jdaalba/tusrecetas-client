import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {IngredientService} from "../ingredient.service";

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  private _ingredients: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  public readonly ingredients: Observable<string[]> = this._ingredients.asObservable();

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
      this.http.get<any>(url)
      .pipe(map(o => o.data))
      .pipe(map(o => this.removeSelectedIngredients(o)))
      .subscribe(rs => this._ingredients.next(rs));
    }
  }

  private removeSelectedIngredients(data: string[]): string[] {
    let selIngs = this.service._selectedIngredients.getValue();
    return data.filter(i => !selIngs.includes(i))
  }

  addIngredient(ingredient: string): void {
    const current = this.service._selectedIngredients.getValue();
    current.push(ingredient);
    this.service._selectedIngredients.next(current);

    // clear input
    // @ts-ignore
    document.getElementById("ing_query").value = "";

    // clear results
    this._ingredients.next([]);
  }

  remove(id: string): void {
    let node = document.getElementById(id);
    if (node) {
      node.remove()
    }
  }

  unselect(ingredient: string): void {
    const current = this.service._selectedIngredients.getValue();
    this.service._selectedIngredients.next(current.filter(i => i != ingredient));
  }
}
