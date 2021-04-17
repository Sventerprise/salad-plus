import { createAction, props } from '@ngrx/store';

export const loadStaticOrderDatas = createAction(
  '[StaticOrderData] Load StaticOrderDatas'
);

export const loadStaticOrderDatasSuccess = createAction(
  '[StaticOrderData] Load StaticOrderDatas Success',
  props<{ data: any }>()
);

export const loadStaticOrderDatasFailure = createAction(
  '[StaticOrderData] Load StaticOrderDatas Failure',
  props<{ error: any }>()
);
