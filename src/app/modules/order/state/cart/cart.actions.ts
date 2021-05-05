import { createAction, props } from '@ngrx/store';
import { OrderItems } from '../../models/Item';

export const addItem = createAction(
  '[Builder] Add Item',
  props<{ orderItems: OrderItems }>()
);

export const updateTotal = createAction(
  '[Order List] Update Total',
  props<{ total: number }>()
);

export const updateQuantity = createAction(
  '[Order List] Update Quantity',
  props<{ quantity: number }>()
)



export const loadCartsSuccess = createAction(
  '[Cart] Load Carts Success',
  props<{ data: any }>()
);

export const loadCartsFailure = createAction(
  '[Cart] Load Carts Failure',
  props<{ error: any }>()
);
