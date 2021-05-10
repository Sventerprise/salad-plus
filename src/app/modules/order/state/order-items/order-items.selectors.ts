import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderItem } from '../../models/Item';
import * as fromOrderItems from './order-items.reducer';

export const selectOrderItemsState = createFeatureSelector<fromOrderItems.State>(
  fromOrderItems.orderItemsFeatureKey
);

export const selectOrderItemIds = createSelector(
  selectOrderItemsState,
  (state) => state.ids
)

export const selectOrderItemEntities = createSelector(
  selectOrderItemsState,
  (state): { [key: string]: OrderItem } => state.entities
)

export const selectOrderItemArray = createSelector(
  selectOrderItemEntities,
  (entities): OrderItem[] => {
    let orderItems: OrderItem[] = []
    for (let key in entities) {
      orderItems.push(entities[key])
    }
    return orderItems
  }
)
