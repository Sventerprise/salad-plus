import { Item, OrderItems } from "./Item";

export interface Cart {
  id: string
  orderItemsIds: string[]
  total: number
}
