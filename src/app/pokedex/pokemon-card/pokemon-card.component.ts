import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input()
  public pokemon!: Pokemon;

  @Input()
  public actions!: Array<ActionButton>;

  @Input()
  public selectable = false;

  @Input()
  public selected = SelectionStatus.None

  @Output()
  public pokemonSelected = new EventEmitter<Pokemon>();

  @Output()
  public pokemonUnselected = new EventEmitter<Pokemon>();

  image!: string;

  style!: any;

  constructor() {

  }

  ngOnInit(): void {
    this.style = {
      'background-image': `url('${this.pokemon.image}')`,
      'background-size': 'contain',
      'background-repeat': 'no-repeat',
      'background-position': 'center',
      'border-radius': '0',
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
