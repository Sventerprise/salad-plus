import { createReducer, on } from '@ngrx/store';
import { OrderItems } from '../../models/Item';
import * as CartActions from './cart.actions';
import { selectOrderItems } from './cart.selectors';

export const cartFeatureKey = 'cart';

export interface State {
  orderItems: OrderItems
  total: number
}

export const initialState: State = {
  orderItems: [],
  total: 0,
};


export const reducer = createReducer(
  initialState,

  on(CartActions.addCartItem, (state, action) => ({
    ...state,
    orderItems: action.orderItems
  })),
  on(CartActions.removeCartItem, (state, action) => ({
    ...state,
    orderItems: action.orderItems
  })),
  on(CartActions.updateTotal, (state, action) => ({
    ...state, total: action.total
  })),
  // on(CartActions.updateQuantity, (state, action) => (
  //   {...state, orderItems[]}
  // )

);

