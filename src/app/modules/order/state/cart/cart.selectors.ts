import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Items, OrderItem, OrderItems } from '../../models/Item';
import { selectCurrentItemIngredientIds, selectCurrentItemIngredients, selectCurrentItemPrice, selectSelectedItemGroup } from '../current-item/current-item.selectors';
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
