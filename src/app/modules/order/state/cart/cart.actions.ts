import { createAction, props } from '@ngrx/store';

export const addCartItem = createAction(
  '[Builder] Add Cart Item',
  props<{ id: string }>()
);

export const removeCartItem = createAction(
  '[Builder] Remove Cart Item',
  props<{ orderItemIds: string[] }>()
);

export const updateTotal = createAction(
  '[Order List] Update Total',
  props<{ total: number }>()
);

export const loadCartsSuccess = createAction(
  '[Cart] Load Carts Success',
  props<{ data: any }>()
);

export const loadCartsFailure = createAction(
  '[Cart] Load Carts Failure',
  props<{ error: any }>()
);

export const clearCart = createAction(
  '[Cart] Clear Cart'
);

