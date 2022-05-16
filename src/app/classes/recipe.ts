import {ingredient} from "./ingredient";

export class recipe {
  id: string;
  name: string;
  ingredients: ingredient[];
  description: string;

  constructor(id: string, name: string, ingredients: ingredient[], description: string) {
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
    this.description = description;
  }

  getParagraphs(): string[] {
    return this.description.split("\n");
  }
}
