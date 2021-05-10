import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderItem, OrderItems } from '../../models/Item';
import { selectOrderItemArray, selectOrderItemEntities } from '../order-items/order-items.selectors';
import * as fromCart from './cart.reducer';

export const selectCartState = createFeatureSelector<fromCart.State>(
  fromCart.cartFeatureKey
);

export const selectCartIds = createSelector(
  selectCartState,
  (state): string[] => state.orderItemIds
);

// export const selectCartArray = createSelector(
// selectOrderItemArray,
// (orderItemArray): OrderItem[] => {
//   let orderItems: OrderItem[] = []
//   for (let item of orderItemArray) {
//     orderItems.push(item)
//   }
//   return orderItems
// }
//   selectOrderItemEntities,
//   (orderEntities): OrderItemArray =>


// );

export const selectCartTotal = createSelector(
  // selectCartState,
  // (state): number => state.total
  selectOrderItemEntities,
  selectCartIds,
  (orderItems, cartIds): number => {
    let total: number = 0
    cartIds.forEach(cartId =>
      total += orderItems[cartId].price
    )
    return total
  }
);
