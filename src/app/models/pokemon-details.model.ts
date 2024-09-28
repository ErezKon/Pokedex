import { PokemonDescription } from "./pokemon-description.model";
import { PokemonStats } from "./pokemon-stats.model";
import { Pokemon } from "./pokemon.model";

export interface PokemonDetails {
    isBaby: boolean;
    isLegendary: boolean;
    isMythical: boolean;
    hasGenderDifference: boolean;
    generation: number;
    catchRate: number;
    evolvesFrom?: number;
    maleRarity: number;
    stats: PokemonStats;
    descriptions: Array<PokemonDescription>;
    nextEvolution?: Pokemon;
    prevEvolution?: Pokemon;
}