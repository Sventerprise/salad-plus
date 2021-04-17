import { Cart } from "./Cart";

export interface Order {
  id: string;
  customerId: string;
  payStatus: string;
  date: string;
  total: number;
  cart: Cart;
}
