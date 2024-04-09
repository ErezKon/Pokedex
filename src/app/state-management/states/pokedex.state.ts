import { Pokemon } from "src/app/models/pokemon.model";

export interface PokedexState {
  pokedex: Array<Pokemon>;
  pokemon: Pokemon;
  selected: Array<Pokemon>;
  fetchingPokedex: boolean;
}

export const initialPokedexState: PokedexState = {
  pokedex: [],
  pokemon: {} as Pokemon,
  selected: [],
  fetchingPokedex: false
};
