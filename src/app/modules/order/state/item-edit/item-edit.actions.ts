import { createAction, props } from '@ngrx/store';
import { Ingredient, IngredientList } from 'src/app/modules/order/models/Ingredient';

// get ingredient infos
export const updateTempIngredientsOfType = createAction(
  '[Builder Form] Load Ingredients of Selected Type from Current Item to Temp List',
  props<{ selectedIngredientsOfType: IngredientList }>()
)

// export const updateAllIngredientsOfType = createAction(
//   '[Builder Form] Update Ingredient Select Popup List',
//   props<{ allIngredientsOfType: IngredientList }>()
// );

export const updateEditIngredientType = createAction(
  '[Builder Form] Update Edited Ingredient Type',
  props<{ ingredientType: string }>()
)

// popup open/close
export const openIngredientSelectorPopup = createAction(
  '[Builder Form] Open Ingredient Sector Popup (Builder)'
);

export const closeIngredientSelectorPopup = createAction(
  '[Builder Popup] Close Ingredient Sector Popup (Builder)'
);

// add/remove (de)selected ingredients
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
