import { OrderItems } from "./Item";

export interface Cart {
  id: string
  orderItems: OrderItems
  total: number
}
