import { createAction, props } from '@ngrx/store';
import { OrderItem } from '../../models/Item';

export const addItem = createAction(
  '[Builder] Add Item',
  props<{ orderItems: OrderItem[] }>()
);

export const updateTotal = createAction(
  '[Order List] Update Total'
);



export const loadCartsSuccess = createAction(
  '[Cart] Load Carts Success',
  props<{ data: any }>()
);

export const loadCartsFailure = createAction(
  '[Cart] Load Carts Failure',
  props<{ error: any }>()
);
