import { createAction, props } from '@ngrx/store';

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
