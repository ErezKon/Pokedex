import { Component, EventEmitter, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { ActionButton } from 'src/app/utils/action-button';
import { getTypeIcon } from 'src/app/utils/type-converter';

export enum SelectionStatus {
  None,
  Selected,
  Unselected
}

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  public pokemon!: Pokemon;

  public actions!: Array<ActionButton>;

  public selectable = false;

  public selected = SelectionStatus.None

  public pokemonSelected = new EventEmitter<Pokemon>();

  public pokemonUnselected = new EventEmitter<Pokemon>();

  image!: string;

  style!: any;

  constructor() {

  }

  ngOnInit(): void {
    this.style = {
      'background-image': `url('${this.pokemon.image}')`,
      'background-size': '60px',
      'width': '60px',
      'height': '60px'
    };
  }

  getPokemonTypeIcon(type: string) {
    return getTypeIcon(type);
  }

  onActionClick(action: ActionButton) {
    console.log(action);
    action.action(this.pokemon);
  }

  onPokemonSelected(event: any) {
    if (!this.selectable || event.target?.classList?.contains('mdc-button__label')) {
      return;
    }
    if(this.selected === SelectionStatus.Selected) {
      this.selected = SelectionStatus.Unselected;
      this.pokemonUnselected.emit(this.pokemon);
    } else if(this.selected === SelectionStatus.None) {
      this.selected = SelectionStatus.Selected;
      this.pokemonSelected.emit(this.pokemon);
    } else {
      this.selected = SelectionStatus.None;
    }
  }

  get SelectionStatus() {
    return SelectionStatus;
  }
}
