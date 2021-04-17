import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStaticOrderData from '../reducers/static-order-data.reducer';

export const selectStaticOrderDataState = createFeatureSelector<fromStaticOrderData.State>(
  fromStaticOrderData.staticOrderDataFeatureKey
);
