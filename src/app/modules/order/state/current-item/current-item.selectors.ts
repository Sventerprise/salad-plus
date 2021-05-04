import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IngredientList } from 'src/app/modules/order/models/Ingredient';
import { Specialties, Specialty } from 'src/app/modules/order/models/Specialty';
import * as fromCurrentItem from './current-item.reducer';
import { selectAllIngredients, selectSpecialties } from '../../../../stores/selectors/order-static-data.selectors';

export const selectCurrentItemState = createFeatureSelector<fromCurrentItem.State>(
  fromCurrentItem.currentItemFeatureKey
);

export const selectSelectedItemGroup = createSelector(
  selectCurrentItemState,
  (state) => state.selectedItemGroup
)

// returns a list of specialties with the matching group
// ex: return all sandwiches
export const selectSpecialtiesOfGroup = createSelector(
  selectSpecialties,
  selectSelectedItemGroup,
  (specialties: Specialty[], selectedGroup: string): Specialties =>
    specialties.filter(specialty =>
      specialty.itemGroup === selectedGroup)
)

export const selectSelectedSpecialty = createSelector(
  selectCurrentItemState,
  (state) => state.selectedSpecialty
)

export const selectSpecialtyIngredients = createSelector(
  selectCurrentItemState,
  (state) => state.specialtyIngredients
)

export const selectCurrentItemIngredients = createSelector(
  selectCurrentItemState,
  (state) => state.currentItemIngredients
)
