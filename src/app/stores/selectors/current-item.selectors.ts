import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Specialty } from 'src/app/modules/order/models/Specialty';
import * as fromCurrentItem from '../reducers/current-item.reducer';
import { selectSpecialties } from './order-static-data.selectors';

export const selectCurrentItemState = createFeatureSelector<fromCurrentItem.State>(
  fromCurrentItem.currentItemFeatureKey
);

export const selectGroup = createSelector(
  selectCurrentItemState,
  (state) => state.itemGroup
)

export const selectItemGroup = createSelector(
  selectSpecialties,
  selectGroup,
  (selectSpecialties: Specialty[], selectGroup) =>
    selectSpecialties.filter(specialty =>
      specialty.itemGroup === selectGroup)
)
