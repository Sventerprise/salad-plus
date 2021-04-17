import { StringDecoder } from "node:string_decoder";
import { Ingredients } from "./Ingredient";

export interface Specialty {
  img: string
  description: string
}

export type Specialties = Specialty[]
