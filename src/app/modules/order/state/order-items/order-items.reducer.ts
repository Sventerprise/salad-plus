import { Action, createReducer, on } from '@ngrx/store';
import { OrderItem, OrderItems } from '../../models/Item';
import * as OrderItemsActions from './order-items.actions';

export const orderItemsFeatureKey = 'orderItems';

export interface State extends OrderItems {
  entities: { [key: string]: OrderItem }
  ids: string[]
}

export const initialState: State = {
  entities: {},
  ids: []
};


export const reducer = createReducer(
  initialState,

  on(OrderItemsActions.loadOrderItems, state => state),
  on(OrderItemsActions.addOrderItem,
    (state, action) => {
      let ids = state.ids.slice(0)
      ids.push(action.orderItem.id)
      ids.sort()
      return {
        ids,
        entities: {
          ...state.entities,
          [action.orderItem.id]: action.orderItem
        }
      }
    }
  ),

);
