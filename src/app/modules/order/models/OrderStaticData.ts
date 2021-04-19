import { Desserts } from "./Dessert"
import { Drinks } from "./Drink"
import { FoodTypes } from "./FoodTypes"
import { IngredientList } from "./Ingredient"
import { Sides } from "./Side"
import { Specialties } from "./Specialty"

export interface OrderStaticData {
  specialties: Specialties
  ingredients: IngredientList
  foodTypes: FoodTypes
  desserts: Desserts
  drinks: Drinks
  sides: Sides
}



