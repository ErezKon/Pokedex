import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  serverURL: string;

  constructor(private http: HttpClient) {
    this.serverURL = `${environment.serverURL}/Pokedex`;
  }

  getPokedex(): Observable<Array<Pokemon>> {
    return this.http.get<Array<Pokemon>>(`${this.serverURL}/GetPokedex`);
  }

  getPokemon(id: number): Observable<Pokemon> {
    if (id < 0) {
      return of({} as Pokemon);
    }
    return this.http.get<Pokemon>(`${this.serverURL}/Get/${id}`);
  }
}
