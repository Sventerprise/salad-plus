import { createAction, props } from '@ngrx/store';
import { IngredientList } from 'src/app/modules/order/models/Ingredient';
import { ItemGroup } from 'src/app/modules/order/models/ItemGroup';
import { Specialty } from 'src/app/modules/order/models/Specialty';


export const setItemGroup = createAction(
  '[Specialty] Set Item Group',
  props<{ selectedItemGroup: ItemGroup }>()
);

export const updateSpecialty = createAction(
  '[Specialty] Update Selected Specialty',
  props<{ selectedSpecialty: Specialty }>()
)

export const loadSpecialtyIngredients = createAction(
  '[Specialty] UpdateCurrentIngredients',
  props<{ ingredientList: IngredientList }>()
)


// boilerplate
export const loadCurrentItems = createAction(
  '[CurrentItem] Load CurrentItems'
);

export const loadCurrentItemsSuccess = createAction(
  '[CurrentItem] Load CurrentItems Success',
  props<{ data: any }>()
);

export const loadCurrentItemsFailure = createAction(
  '[CurrentItem] Load CurrentItems Failure',
  props<{ error: any }>()
);

export const clearSpecialty = createAction(
  '[SS-Selector] Clear Current Item'
);

export const clearSpecialtyIngredients = createAction(
  '[SS-Selector] Clear Current Item'
);

