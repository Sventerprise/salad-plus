import { Action, ActionReducer, combineReducers, createReducer, MetaReducer, on, ActionReducerMap } from '@ngrx/store';
import * as OrderActions from './actions/order.actions';
import * as fromCart from './reducers/cart.reducer';
import * as fromOrder from './reducers/order.reducer';
import * as fromOrderStaticData from './reducers/order-static-data.reducer';
import { environment } from 'src/environments/environment';

export const orderFeatureKey = 'order';

export interface AppState {

  [fromCart.cartFeatureKey]: fromCart.State;
  [fromOrder.orderFeatureKey]: fromOrder.State;
  [fromOrderStaticData.orderStaticDataFeatureKey]: fromOrderStaticData.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromCart.cartFeatureKey]: fromCart.reducer,
  [fromOrder.orderFeatureKey]: fromOrder.reducer,
  [fromOrderStaticData.orderStaticDataFeatureKey]: fromOrderStaticData.reducer
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

