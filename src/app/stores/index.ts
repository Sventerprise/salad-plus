import { Action, createReducer, on } from '@ngrx/store';
import * as OrderActions from './order.actions';
import * as fromCart from './reducers/cart.reducer';
import * as fromOrder from './reducers/order.reducer';
import * as fromStaticOrderData from './reducers/static-order-data.reducer';

export const orderFeatureKey = 'order';

export interface State {

  [fromCart.cartFeatureKey]: fromCart.State;
  [fromOrder.orderFeatureKey]: fromOrder.State;
  [fromStaticOrderData.staticOrderDataFeatureKey]: fromStaticOrderData.State;
}

export const initialState: State = {

};


export const reducer = createReducer(
  initialState,

  on(OrderActions.loadOrders, state => state),
  on(OrderActions.loadOrdersSuccess, (state, action) => state),
  on(OrderActions.loadOrdersFailure, (state, action) => state),

);

