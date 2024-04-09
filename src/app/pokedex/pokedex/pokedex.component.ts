import { Component } from '@angular/core';
import { State, Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { AppState } from 'src/app/state-management/states/app.state';

import * as pokedexActions from '../../state-management/actions/pokedex.actions';
import { getPokedex, selectPokedexState } from 'src/app/state-management/selectors/pokedex.selectors';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent {
  pokedex$: Observable<Pokemon[]>;
  
  constructor(private store: Store<AppState>) {
    store.dispatch(pokedexActions.getPokedex());
    this.pokedex$ = store.pipe(select(getPokedex));
  }

  onPokemonSelected(pokemon: Pokemon) {}
}
