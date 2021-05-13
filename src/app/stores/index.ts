import { Action, ActionReducer, combineReducers, createReducer, MetaReducer, on, ActionReducerMap, StoreModule } from '@ngrx/store';
import * as fromCart from 'src/app/modules/order/state/cart/cart.reducer';
import * as fromOrder from '../modules/order/state/order.reducer';
import * as fromOrderStaticData from './reducers/order-static-data.reducer';
import { environment } from 'src/environments/environment';
import * as fromOrderItems from '../modules/order/state/order-items/order-items.reducer';
import * as fromPayment from '../modules/payment/state/payment.reducer';

export const orderFeatureKey = 'order';

export interface AppState {

  [fromCart.cartFeatureKey]: fromCart.State;
  [fromOrderItems.orderItemsFeatureKey]: fromOrderItems.State;
  [fromOrder.orderFeatureKey]: fromOrder.State;
  [fromOrderStaticData.orderStaticDataFeatureKey]: fromOrderStaticData.State;
  [fromPayment.paymentFeatureKey]: fromPayment.State
}

export const reducers: ActionReducerMap<AppState> = {
  [fromCart.cartFeatureKey]: fromCart.reducer,
  [fromOrderItems.orderItemsFeatureKey]: fromOrderItems.reducer,
  [fromOrder.orderFeatureKey]: fromOrder.reducer,
  [fromOrderStaticData.orderStaticDataFeatureKey]: fromOrderStaticData.reducer,
  [fromPayment.paymentFeatureKey]: fromPayment.reducer
};


export const metaReducers: MetaReducer<AppState>[] =
  !environment.production
    ? [debug]
    : [];

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action)
  }
}

