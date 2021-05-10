import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';

export const cartFeatureKey = 'cart';

export interface State {
  orderItemIds: string[]
  total: number
}

export const initialState: State = {
  orderItemIds: [],
  total: 0,
};


export const reducer = createReducer(
  initialState,

  on(CartActions.addCartItem, (state, action) => {
    let ids = state.orderItemIds.slice(0)
    ids.push(action.id)
    return {
      ...state, orderItemIds: ids
    }
  }),
  on(CartActions.removeCartItem, (state, action) => ({
    ...state,
    orderItemIds: action.orderItemIds
  })),
  on(CartActions.updateTotal, (state, action) => ({
    ...state, total: action.total
  })),
  on(CartActions.clearCart,
    () => (initialState))

);

