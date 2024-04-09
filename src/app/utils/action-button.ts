import { Pokemon } from "../models/pokemon.model";

export interface ActionButton {
  name: string;
  action: (mon: Pokemon) => void;
}
