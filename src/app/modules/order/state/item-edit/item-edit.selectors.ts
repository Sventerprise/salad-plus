import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IngredientList } from 'src/app/modules/order/models/Ingredient';
import { selectAllIngredients } from 'src/app/stores/selectors/order-static-data.selectors';
import * as fromItemEdit from './item-edit.reducer';

export const selectItemEditState = createFeatureSelector<fromItemEdit.State>(
  fromItemEdit.itemEditFeatureKey
);



// export const selectAllIngredientsOfType2 = createSelector(
//   selectItemEditState,
//   (state): IngredientList => state.allIngredientsOfType
// )

export const selectIngredientType = createSelector(
  selectItemEditState,
  (state): string => state.ingredientType
)

export const selectAllIngredientsOfType = createSelector(
  selectAllIngredients,
  selectIngredientType,
  (allIngredients, type): IngredientList => allIngredients.filter(ingredient => ingredient.type === type)
)

export const selectSelectedIngredientsOfType = createSelector(
  selectItemEditState,
  (state): IngredientList => state.selectedIngredientsOfType
)

export const selectSelectorFlag = createSelector(
  selectItemEditState,
  (state): boolean => state.selectorFlag
)

