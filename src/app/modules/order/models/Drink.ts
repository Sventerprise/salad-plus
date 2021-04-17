export type DrinkTypePrices = {
  soda: number
  juice: number
  other: number
  water: number
}

export type DrinkTypes = keyof DrinkTypePrices

export interface Drink {
  id: string
  name: string
  type: DrinkTypes
  price: string
  image: string
}

export type Drinks = Drink[]
