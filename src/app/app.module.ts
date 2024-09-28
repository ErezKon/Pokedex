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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPokemonPipe } from './utils/pipes/pokemon-filter.pipe';
import { SinglePokemonComponent } from './pokedex/single-pokemon/single-pokemon.component';


@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,
    PokemonCardComponent,
    PokedexFilterComponent,
    FilterPokemonPipe,
    SinglePokemonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [FilterPokemonPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
