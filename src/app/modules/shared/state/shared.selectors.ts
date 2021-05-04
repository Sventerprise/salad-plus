import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromShared from './shared.reducer';

export const selectSharedState = createFeatureSelector<fromShared.State>(
  fromShared.sharedFeatureKey
);

export const selectHeaderMessage = createSelector(
  selectSharedState,
  (state): string => state.headerMessage
);
