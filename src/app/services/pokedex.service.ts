import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, Subscription } from 'rxjs';
import { environment } from '../environments/environment';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokedexService implements OnDestroy {
  serverURL: string;
  subscriptions = new Array<Subscription>();

  private pokedex$ = new BehaviorSubject<Array<Pokemon>>([]);
  private pokemon$ = new BehaviorSubject<Pokemon>({} as Pokemon);
  private loadingPokedex$ = new BehaviorSubject<boolean>(false);
  private loadingPokemon$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.serverURL = `${environment.serverURL}/Pokedex`;
  }

  getPokedex(): Observable<Array<Pokemon>> {
    this.loadingPokedex$.next(true);
    this.subscriptions.push(this.http.get<Array<Pokemon>>(`${this.serverURL}/GetPokedex`)
      .pipe(catchError(err => {
        this.loadingPokedex$.next(false);
        console.error(err);
        return of([]);
      }))
      .subscribe(pokedex => {
        this.pokedex$.next(pokedex);
        this.loadingPokedex$.next(false);
      }));
    return this.pokedex$.asObservable();
  }

  getPokemon(id: number): Observable<Pokemon> {
    if (id < 0) {
      return of({} as Pokemon);
    }
    this.loadingPokemon$.next(true);
    this.subscriptions.push(this.http.get<Pokemon>(`${this.serverURL}/Get/${id}`)
      .pipe(catchError(err => {
        this.loadingPokemon$.next(false);
        console.error(err);
        return of({} as Pokemon);
      }))
      .subscribe(pokemon => {
        this.pokemon$.next(pokemon);
        this.loadingPokemon$.next(false);
      }));
    return this.pokemon$.asObservable();
  }

  getPokedex$(): Observable<Array<Pokemon>> {
    return this.pokedex$.asObservable();
  }
  getLoadingPokedex$(): Observable<boolean> {
    return this.loadingPokedex$.asObservable();
  }

  getPokemon$(): Observable<Pokemon> {
    return this.pokemon$.asObservable();
  }
  getLoadingPokemon$(): Observable<boolean> {
    return this.loadingPokemon$.asObservable();
  }

  
  ngOnDestroy(): void {
    for (const Subscription of this.subscriptions) {
      Subscription.unsubscribe();
    }
  }
}
