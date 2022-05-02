import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ingredient} from "./classes/ingredient";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  public  _selectedIngredients: BehaviorSubject<ingredient[]> = new BehaviorSubject<ingredient[]>([]);

  public readonly selectedIngredients: Observable<ingredient[]> = this._selectedIngredients.asObservable();

  constructor() {
  }

}
