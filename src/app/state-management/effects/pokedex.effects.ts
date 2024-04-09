import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { PokedexService } from "src/app/services/pokedex.service";
import { AppState } from "../states/app.state";

import * as pokedexActions from '../actions/pokedex.actions';
import { Pokemon } from "src/app/models/pokemon.model";
import { exhaustMap, map, catchError, of } from "rxjs";

@Injectable()
export class PokedexEffects {

  constructor(private actions$: Actions,
    private pokedexService: PokedexService,
    private store: Store<AppState>) {

  }

  getPokedex$ = createEffect(() => this.actions$.pipe(
    ofType(pokedexActions.getPokedex),
    exhaustMap(() => this.pokedexService.getPokedex()
      .pipe(
        map(res => {
          return pokedexActions.getPokedexSuccss({ pokemon: res as Array<Pokemon> });
        }),
        catchError(err => {
          console.error(err);
          return of(pokedexActions.getPokedexFailure());
        })
      ))
  ));

  getPokemon$ = createEffect(() => this.actions$.pipe(
    ofType(pokedexActions.getPokemon),
    exhaustMap((action) => this.pokedexService.getPokemon(action.pokemonId)
      .pipe(
        map(res => {
          return pokedexActions.getPokemonSuccss({ pokemon: res as Pokemon });
        }),
        catchError(err => {
          console.error(err);
          return of(pokedexActions.getPokemonFailure());
        })
      ))
  ));
}
