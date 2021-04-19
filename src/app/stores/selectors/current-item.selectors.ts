import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCurrentItem from '../reducers/current-item.reducer';

export const selectCurrentItemState = createFeatureSelector<fromCurrentItem.State>(
  fromCurrentItem.currentItemFeatureKey
);

