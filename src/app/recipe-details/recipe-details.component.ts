import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {recipe} from "../classes/recipe";
import {Observable} from "rxjs";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  _recipe: Observable<recipe> = new Observable<recipe>();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this._recipe = this.http.get<recipe>(`http://localhost:8080/recipes/${id}`)
  }
}
