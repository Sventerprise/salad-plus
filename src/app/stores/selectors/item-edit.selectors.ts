import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IngredientList } from 'src/app/modules/order/models/Ingredient';
import * as fromItemEdit from '../reducers/item-edit.reducer';

export const selectItemEditState = createFeatureSelector<fromItemEdit.State>(
  fromItemEdit.itemEditFeatureKey
);



export const selectAllIngredientsOfType = createSelector(
  selectItemEditState,
  (state): IngredientList => state.allIngredientsOfType
)

export const selectSelectedIngredientsOfType = createSelector(
  selectItemEditState,
  (state): IngredientList => state.selectedIngredientsOfType
)

export const selectSelectorFlag = createSelector(
  selectItemEditState,
  (state): boolean => state.selectorFlag
)
