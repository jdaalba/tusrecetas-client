import {ingredient} from "./ingredient";

export class recipe {
  id: string;
  name: string;
  ingredients: ingredient[];


  constructor(id: string, name: string, ingredients: ingredient[]) {
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
  }
}
