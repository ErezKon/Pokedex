import { Pipe, PipeTransform } from "@angular/core";
import { Pokemon } from "src/app/models/pokemon.model";

@Pipe({name:'filterPokemon'})
export class FilterPokemonPipe implements PipeTransform {
    transform(list : Pokemon[] | null, filter : string | null){
        if(!list) {
            return [];
        }
        if(!filter) {
            return list;
        }
        return list.filter(mon => mon.id === +filter || mon.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1);
    }
}