import { Action, createReducer, on } from '@ngrx/store';
import * as CartActions from '../actions/cart.actions';

export const cartFeatureKey = 'cart';

export interface State {

}

export const initialState: State = {

};


export const reducer = createReducer(
  initialState,

  on(CartActions.loadCarts, state => state),
  on(CartActions.loadCartsSuccess, (state, action) => state),
  on(CartActions.loadCartsFailure, (state, action) => state),

);

