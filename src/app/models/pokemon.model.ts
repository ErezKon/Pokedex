import { PokemonDetails } from "./pokemon-details.model";

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  type: string[];
  weakness: string[];
  details?: PokemonDetails;
}
