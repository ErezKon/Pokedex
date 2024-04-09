import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { PokedexComponent } from './pokedex/pokedex/pokedex.component';
import { PokemonCardComponent } from './pokedex/pokemon-card/pokemon-card.component';
import { PokedexFilterComponent } from './pokedex/pokedex-filter/pokedex-filter.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PokedexEffects } from './state-management/effects/pokedex.effects';
import { appReducers, metaReducers } from './state-management/reducers';


@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,
    PokemonCardComponent,
    PokedexFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers, { metaReducers }),
    EffectsModule.forRoot([
      PokedexEffects
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
