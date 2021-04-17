import { Desserts } from "./Dessert"
import { Drinks } from "./Drink"
import { FoodTypePrices, FoodTypes } from "./FoodTypes"
import { Ingredients } from "./Ingredient"
import { Sides } from "./Side"
import { Specialties } from "./Specialty"

export interface OrderStaticData {
  specialties: Specialties
  ingredients: Ingredients
  foodTypePrices: FoodTypePrices
  desserts: Desserts
  drinks: Drinks
  sides: Sides
}



