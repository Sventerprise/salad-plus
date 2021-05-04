import { createAction, props } from '@ngrx/store';
import { Ingredient, IngredientList } from 'src/app/modules/order/models/Ingredient';

export const updateTempIngredientsOfType = createAction(
  '[Builder Form] Load Ingredients of Selected Type from Current Item to Temp List',
  props<{ selectedIngredientsOfType: IngredientList }>()
)

export const updateAllIngredientsOfType = createAction(
  '[Builder Form] Update Ingredient Select Popup List',
  props<{ allIngredientsOfType: IngredientList }>()
);

export const openIngredientSelectorPopup = createAction(
  '[Builder Form] Open Ingredient Sector Popup (Builder)'
);

export const closeIngredientSelectorPopup = createAction(
  '[Builder Popup] Close Ingredient Sector Popup (Builder)'
);

export const clearSelectedIngredients = createAction(
  '[Builder Popup] Clear All Selected From Temp List'
)

export const addSelectedIngredient = createAction(
  '[Builder Popup] Add Selected to Temp List',
  props<{ ingredients: IngredientList }>()
)

export const removeSelectedIngredient = createAction(
  '[Builder Popup] Remove Selected From Temp List',
  props<{ ingredients: IngredientList }>()
)

