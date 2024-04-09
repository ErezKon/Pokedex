import { createReducer, on } from "@ngrx/store";
import { initialPokedexState } from "../states/pokedex.state";

import * as pokedexActions from '../actions/pokedex.actions';

export const pokedexReducer = createReducer(
  initialPokedexState,
  on(pokedexActions.getPokedex, state => ({ ...state, pokedex: [], fetchingPokedex: true })),
  on(pokedexActions.getPokedexSuccss, (state, { pokemon }) => ({ ...state, pokedex: [...pokemon], fetchingPokedex: false })),
  on(pokedexActions.getPokemonSuccss, (state, { pokemon }) => ({ ...state, pokemon: pokemon, fetchingPokedex: false })),
  on(pokedexActions.getPokedexFailure, (state) => ({ ...state, fetchingPokedex: false })),
  on(pokedexActions.getPokemonFailure, (state) => ({ ...state, fetchingPokedex: false })),
);
