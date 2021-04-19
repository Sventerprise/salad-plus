import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrderStaticData from '../reducers/order-static-data.reducer';

export const selectOrderStaticDataState = createFeatureSelector<fromOrderStaticData.State>(
  fromOrderStaticData.orderStaticDataFeatureKey
);
