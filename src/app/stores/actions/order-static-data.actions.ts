import { createAction, props } from '@ngrx/store';
import { OrderStaticData } from 'src/app/modules/order/models/OrderStaticData';

export const loadStaticOrderData = createAction(
  '[StaticOrderData] Load StaticOrderData'
);

export const loadStaticOrderDataSuccess = createAction(
  '[StaticOrderData] Load StaticOrderData Success',
  props<{ data: OrderStaticData }>()
);

export const loadStaticOrderDataFailure = createAction(
  '[StaticOrderData] Load StaticOrderData Failure',
  props<{ error: any }>()
);
