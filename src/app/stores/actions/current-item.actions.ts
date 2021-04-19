import { createAction, props } from '@ngrx/store';
import { ItemGroup } from 'src/app/modules/order/models/ItemGroup';


export const setItemGroup = createAction(
  '[Specialty] Set Item Group',
  props<{ itemGroup: ItemGroup }>()
);


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
