import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  public  _selectedIngredients: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  public readonly selectedIngredients: Observable<string[]> = this._selectedIngredients.asObservable();

  constructor() {
  }

}
