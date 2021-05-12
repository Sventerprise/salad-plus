import { IngredientList, Ingredients } from "./Ingredient";
import { ItemGroup } from "./ItemGroup";

export interface Item {
  id: string
  name: string
  ingredients: Ingredients
  itemGroup: ItemGroup
  price: number
}

export type Items = Item[]

export interface OrderItem extends Item {
  quantity: number
  subtotal: number
  viewDetail: boolean
}

export interface OrderItemEntity {
  [key: string]: OrderItem
}

export interface OrderItems {
  entities: OrderItemEntity
  ids: string[]
}

export interface OrderItemDetailed extends OrderItem {
  ingredientDetails: IngredientList
}
