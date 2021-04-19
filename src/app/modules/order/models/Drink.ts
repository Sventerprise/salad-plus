export type DrinkTypePrices = {
  soda: number
  juice: number
  other: number
  water: number
}

export type DrinkTypes = keyof Drink

export type Drinks = Drink[]


export interface Drink {
  [id: string]: {
    name: string
    type: DrinkTypes
    price: string
    image: string
  }
}
