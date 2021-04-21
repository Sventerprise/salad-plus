import { FoodTypes } from "./FoodTypes";

export interface Ingredient {
  id: string,
  name: string
  image: string
  itemGroup: string
  type: FoodTypes
}

export type Ingredients = string[]

export type IngredientList = Ingredient[]


