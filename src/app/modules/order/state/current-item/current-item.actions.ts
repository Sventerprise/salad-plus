import { createAction, createSelector, props } from '@ngrx/store';
import { Ingredients } from 'src/app/modules/order/models/Ingredient';
import { ItemGroup } from 'src/app/modules/order/models/ItemGroup';
import { OrderItem } from '../../models/Item';


export const setItemGroup = createAction(
  '[Specialty] Set Item Group',
  props<{ currentItemGroup: ItemGroup }>()
);

export const updateSpecialtyId = createAction(
  '[Specialty] Update Selected Specialty ID',
  props<{ selectedSpecialtyId: string }>()
)

export const loadItemToBuilder = createAction(
  '[OrderForm] Load Cart Item to Current Item',
  props<{ orderItem: OrderItem }>()
)

export const clearCurrentItem = createAction(
  '[Builder Confirm Popup] Clear Current Item'
);

export const updateIngredients = createAction(
  '[Builder Form] Update ingredients on the current item',
  props<{ ingredients: Ingredients }>()
);

export const updateCurrentItemId = createAction(
  '[Builder onInit] Update Current Item ID',
  props<{ id: string }>()
)

export const updateCurrentItemName = createAction(
  '[Builder onInit] Update Current Item Name',
  props<{ name: string }>()
)

export const updateCurrentItemPriceAndSubtotal = createAction(
  '[Builder onInit] Update Current Item Price',
  props<{ price: number }>()
)

