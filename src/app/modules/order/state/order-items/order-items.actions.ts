import { createAction, props } from '@ngrx/store';
import { OrderItem } from '../../models/Item';

export const loadOrderItems = createAction(
  '[OrderItems] Load OrderItems'
);

export const addOrderItem = createAction(
  '[OrderItems] Add OrderItem',
  props<{ orderItem: OrderItem }>()
);

export const deleteOrderItem = createAction(
  '[OrderItems] Delete OrderItem',
  props<{ id: string }>()
);




