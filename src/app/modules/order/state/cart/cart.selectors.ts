import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderItems } from '../../models/Item';
import * as fromCart from './cart.reducer';

export const selectCartState = createFeatureSelector<fromCart.State>(
  fromCart.cartFeatureKey
);

export const selectOrderItems = createSelector(
  selectCartState,
  (state): OrderItems => state.orderItems
);

export const selectOrderTotal = createSelector(
  selectCartState,
  (state): number => state.total
);

export const selectTotal = createSelector(
  selectCartState,
  (state) => state.total
)
