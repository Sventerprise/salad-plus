import { Desserts } from "./Dessert"
import { Drinks } from "./Drink"
import { IngredientList, IngredientType, IngredientTypes } from "./Ingredient"
import { Sides } from "./Side"
import { Specialties } from "./Specialty"

export interface OrderStaticData {
  specialties: Specialties
  ingredients: IngredientList
  ingredientTypes: IngredientType
  desserts: Desserts
  drinks: Drinks
  sides: Sides
}



