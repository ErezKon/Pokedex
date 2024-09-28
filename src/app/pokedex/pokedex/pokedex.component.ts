import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { MatDialog } from '@angular/material/dialog';
import { SinglePokemonComponent } from '../single-pokemon/single-pokemon.component';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent {
  pokedex$: Observable<Pokemon[]>;
  loading$: Observable<boolean>;
  filter: string | null = null;
  constructor(public dialog: MatDialog, private pokedexService: PokedexService) {
    this.pokedex$ = pokedexService.getPokedex();
    this.loading$ = pokedexService.getLoadingPokedex$();
  }

  onFilter(filter: string | null) {
    this.filter = filter;
  }

  onPokemonSelected(pokemon: Pokemon) {
    this.pokedexService.getPokemon(pokemon.id);
    const dialogRef = this.dialog.open(SinglePokemonComponent, {
      data: pokemon,
      width: '70vw',
      height: '80vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
