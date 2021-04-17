import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCart from '../reducers/cart.reducer';

export const selectCartState = createFeatureSelector<fromCart.State>(
  fromCart.cartFeatureKey
);
