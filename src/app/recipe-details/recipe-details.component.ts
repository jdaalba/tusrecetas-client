import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  private id: Number = 69;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }
}
