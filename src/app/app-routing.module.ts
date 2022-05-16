import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {IngredientsComponent} from "./ingredients/ingredients.component";
import {RecipeDetailsComponent} from "./recipe-details/recipe-details.component";
import {FinderComponent} from "./finder/finder.component";

const routes: Routes = [
  {path: '', redirectTo: 'finder', pathMatch: 'full'},
  {path: 'finder', component: FinderComponent},
  {path: 'ingredients', component: IngredientsComponent},
  {path: 'recipes/:id', component: RecipeDetailsComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
