import { createSelector } from "@ngrx/store";
import { AppState } from "../states/app.state";
import { PokedexState } from "../states/pokedex.state";

export const selectPokedexState = (state: AppState) => state.pokedex;

export const getPokedex = createSelector(
  selectPokedexState,
  (state: PokedexState) => state.pokedex
);

export const getSinglePokemon = createSelector(
  selectPokedexState,
  (state: PokedexState) => state.pokemon
);

export const getSelectedPokemon = createSelector(
  selectPokedexState,
  (state: PokedexState) => state.selected
);

export const fetchingPokedex = createSelector(
  selectPokedexState,
  (state: PokedexState) => state.fetchingPokedex
);
