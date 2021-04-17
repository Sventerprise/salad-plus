import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrder from '../reducers/order.reducer';

export const selectOrderState = createFeatureSelector<fromOrder.State>(
  fromOrder.orderFeatureKey
);
