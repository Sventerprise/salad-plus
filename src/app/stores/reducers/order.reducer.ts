import { Action, createReducer, on } from '@ngrx/store';
import * as OrderActions from '../actions/order.actions';

export const orderFeatureKey = 'order';

export interface State {

}

export const initialState: State = {

};


export const reducer = createReducer(
  initialState,

  on(OrderActions.loadOrders, state => state),
  on(OrderActions.loadOrdersSuccess, (state, action) => state),
  on(OrderActions.loadOrdersFailure, (state, action) => state),

);

