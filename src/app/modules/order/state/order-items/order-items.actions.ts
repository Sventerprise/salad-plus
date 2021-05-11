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

export const updateQuantityAndSubtotal = createAction(
  '[OrderItems Form] Update Quantity and Subtotal',
  props<{ quantity: number, id: string }>()
);

export const toggleDetail = createAction(
  '[OrderItems] Toggle Order Item Detail View',
  props<{ id: string }>()
)

export const clearOrderItems = createAction(
  '[Cart] Clear all order items')
