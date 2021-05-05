import { createAction, props } from '@ngrx/store';
import { IngredientList } from 'src/app/modules/order/models/Ingredient';
import { ItemGroup } from 'src/app/modules/order/models/ItemGroup';
import { Specialty } from 'src/app/modules/order/models/Specialty';


export const setItemGroup = createAction(
  '[Specialty] Set Item Group',
  props<{ selectedItemGroup: ItemGroup }>()
);

export const updateSpecialtyId = createAction(
  '[Specialty] Update Selected Specialty ID',
  props<{ selectedSpecialtyId: string }>()
)

// export const setItemIngredientsFromSpecialty = createAction(
//   '[Specialty] Set Item Ingredients to Specialty Ingredients',
//   props<{ initialIngredients: IngredientList }>()
// )

// export const updateItemIngredients = createAction(
//   '[Builder Form] Update ingredients on the current item',
//   props<{ list: IngredientList }>()
// );

export const commitChanges = createAction(
  '[Builder Popup] Commit Temp List Changes to Item',
  props<{ ingredients: IngredientList }>()
)

export const clearCurrentItem = createAction(
  '[Builder Confirm Popup] Clear Current Item'
);


export const updateCurrentItemIngredients = createAction(
  '[Builder Form] Update ingredients on the current item',
  props<{ ingredients: IngredientList }>()
);

