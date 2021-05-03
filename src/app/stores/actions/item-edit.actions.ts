import { createAction, props } from '@ngrx/store';
import { IngredientList } from 'src/app/modules/order/models/Ingredient';

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



