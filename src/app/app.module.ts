import {HttpClientModule} from "@angular/common/http";
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { FinderComponent } from './finder/finder.component';

@NgModule({
  declarations: [
    AppComponent,
    IngredientsComponent,
    RecipesComponent,
    RecipeDetailsComponent,
    FinderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
