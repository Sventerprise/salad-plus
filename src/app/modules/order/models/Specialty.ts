import { Item } from "./Item";

export interface Specialty extends Item {
  img: string
  description: string
}

export type Specialties = Specialty[]
