import { createReducer, on } from '@ngrx/store';
import { OrderItems } from '../../models/Item';
import * as CartActions from './cart.actions';

export const cartFeatureKey = 'cart';

export interface State {
  orderItems: OrderItems
}

export const initialState: State = {
  orderItems: []
};


export const reducer = createReducer(
  initialState,

  on(CartActions.addItem, (state, action) => ({
    ...state,
    orderItems: action.orderItems
  }))


);

