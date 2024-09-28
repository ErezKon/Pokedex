import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { PokemonDescription } from 'src/app/models/pokemon-description.model';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokedexService } from 'src/app/services/pokedex.service';
import { getTypeIcon } from 'src/app/utils/type-converter';

@Component({
  selector: 'app-single-pokemon',
  templateUrl: './single-pokemon.component.html',
  styleUrls: ['./single-pokemon.component.scss']
})
export class SinglePokemonComponent implements OnDestroy {

  descriptionIndex = 0;
  pokemon$: Observable<Pokemon>;
  loading$: Observable<boolean>;
  pokemonSubscription: Subscription;
  pokemonDescription?: PokemonDescription;
  evolutionChain?: Array<{id: number, name: string, image: string}> = [];
  
  constructor(public dialogRef: MatDialogRef<SinglePokemonComponent>,
              private pokedexService: PokedexService,
              @Inject(MAT_DIALOG_DATA) public pokemon: Pokemon) {
    this.pokemon$ = pokedexService.getPokemon$();
    this.loading$ = pokedexService.getLoadingPokemon$();
    this.pokemonSubscription = this.pokemon$.subscribe(pokemon => {
      this.pokemon = pokemon;
      if(pokemon?.id) {
        this.pokemonDescription = pokemon.details?.descriptions[this.descriptionIndex];
        this.loadEvolutionChain(pokemon);
        this.evolutionChain = this.evolutionChain?.sort((a, b) => a.id - b.id);
        console.log(this.evolutionChain);
      }
    });
  }

  loadEvolutionChain(pokemon?: Pokemon) {
    if(!pokemon) {
      return;
    }
    this.evolutionChain?.push(
      {
        id: pokemon.id, 
        name: pokemon.name, 
        image: pokemon.image
      }
    );
    if(pokemon.details?.nextEvolution) {
      this.loadEvolutionChain(pokemon.details?.nextEvolution);
    }
    if(pokemon.details?.prevEvolution) {
      this.loadEvolutionChain(pokemon.details?.prevEvolution);
    }
  }

  onCloseClick() {
    this.dialogRef.close();
  }
  ngOnDestroy(): void {
    this.pokemonSubscription.unsubscribe();
  }
  next() {
    if(this.descriptionIndex + 1 >= (this.pokemon.details?.descriptions?.length ?? 0)) {
      return;
    }
    this.descriptionIndex++;
    this.pokemonDescription = this.pokemon.details?.descriptions[this.descriptionIndex];
  }
  prev() {
    if(this.descriptionIndex - 1 <= 0) {
      return;
    }
    this.descriptionIndex--;
    this.pokemonDescription = this.pokemon.details?.descriptions[this.descriptionIndex];
  }
  
  getPokemonTypeIcon(type: string) {
    return getTypeIcon(type);
  }
}
