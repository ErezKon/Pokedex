import { createAction, props } from "@ngrx/store";
import { Pokemon } from "src/app/models/pokemon.model";

export const getPokedex = createAction(
  '[Pokedex] Get Pokedex'
);
export const getPokedexSuccss = createAction(
  '[Pokedex] Get Pokedex Success',
  props<{ pokemon: Array<Pokemon> }>()
);
export const getPokedexFailure = createAction(
  '[Pokedex] Get Pokedex Failure'
);

export const getPokemon = createAction(
  '[Pokedex] Get Pokemon',
  props<{ pokemonId: number }>()
);
export const getPokemonSuccss = createAction(
  '[Pokedex] Get Pokemon Success',
  props<{ pokemon: Pokemon }>()
);
export const getPokemonFailure = createAction(
  '[Pokedex] Get Pokemon Failure'
);

export const setSelected = createAction(
  '[Pokedex] Set Pokedex',
  props<{ pokemon: Array<Pokemon> }>()
);
