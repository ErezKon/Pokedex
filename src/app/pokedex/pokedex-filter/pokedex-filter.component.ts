import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokedex-filter',
  templateUrl: './pokedex-filter.component.html',
  styleUrls: ['./pokedex-filter.component.scss']
})
export class PokedexFilterComponent implements OnDestroy {
  filterFormControl = new FormControl('');
  @Output() filter = new EventEmitter<string | null>();
  private sub!: Subscription;

  constructor() {
    this.sub = this.filterFormControl.valueChanges.subscribe((val) => {
      this.filter.emit(val);
    }) 
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
