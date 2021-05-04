import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Items, OrderItems } from '../../models/Item';
import * as fromCart from './cart.reducer';

export const selectCartState = createFeatureSelector<fromCart.State>(
  fromCart.cartFeatureKey
);

export const selectOrderItems = createSelector(
  selectCartState,
  (state): OrderItems => state.orderItems
);
