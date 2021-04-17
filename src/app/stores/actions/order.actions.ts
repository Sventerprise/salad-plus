import { createAction, props } from '@ngrx/store';

export const loadOrders = createAction(
  '[Order] Load Orders'
);

export const loadOrdersSuccess = createAction(
  '[Order] Load Orders Success',
  props<{ data: any }>()
);

export const loadOrdersFailure = createAction(
  '[Order] Load Orders Failure',
  props<{ error: any }>()
);
