import { Component } from '@angular/core';
import { State, Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { AppState } from 'src/app/state-management/states/app.state';

import * as pokedexActions from '../../state-management/actions/pokedex.actions';
import { fetchingPokedex, getPokedex, selectPokedexState } from 'src/app/state-management/selectors/pokedex.selectors';
import { MatDialog } from '@angular/material/dialog';
import { SinglePokemonComponent } from '../single-pokemon/single-pokemon.component';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent {
  pokedex$: Observable<Pokemon[]>;
  loading$: Observable<boolean>;
  filter: string | null = null;
  constructor(private store: Store<AppState>, public dialog: MatDialog) {
    store.dispatch(pokedexActions.getPokedex());
    this.pokedex$ = store.pipe(select(getPokedex));
    this.loading$ = store.pipe(select(fetchingPokedex));
  }

  onFilter(filter: string | null) {
    this.filter = filter;
  }

  onPokemonSelected(pokemon: Pokemon) {
    this.store.dispatch(pokedexActions.getPokemon({ pokemonId: pokemon.id }));
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
