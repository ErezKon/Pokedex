import { RouterReducerState } from '@ngrx/router-store';
import { PokedexState, initialPokedexState } from './pokedex.state';

export interface AppState {
  router?: RouterReducerState;
  pokedex: PokedexState;
}

export const initialAppState: AppState = {
  pokedex: initialPokedexState
};
