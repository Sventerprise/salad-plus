export type FoodTypePrices = {
  Condiment: number
  Bread: number
  Cheese: number
  Meat: number
  Veggie: number
}

export type FoodTypes = keyof FoodTypePrices
