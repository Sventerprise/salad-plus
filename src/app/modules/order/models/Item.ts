import { IngredientList } from "./Ingredient";
import { ItemGroup } from "./ItemGroup";

export interface Item {
  id: string
  name: string
  ingredients: IngredientList
  itemGroup: ItemGroup
}

export type Items = Item[]

export interface OrderItem extends Item {
  quantity: number
  subtotal: number
}

export type OrderItems = OrderItem[]
