import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Items, OrderItem, OrderItems } from '../../models/Item';
import { selectCurrentItemIngredientIds, selectCurrentItemIngredients, selectCurrentItemPrice, selectSelectedItemGroup } from '../current-item/current-item.selectors';
import * as fromCart from './cart.reducer';

export const selectCartState = createFeatureSelector<fromCart.State>(
  fromCart.cartFeatureKey
);

export const selectOrderItems = createSelector(
  selectCartState,
  (state): OrderItems => state.orderItems
);

export const selectOrderTotal = createSelector(
  selectCartState,
  (state): number => state.total
);



export const selectOrderItemQuantity = createSelector(
  selectCartState,
  (state) => state.quantity
)

export const selectCurrentOrderItem = createSelector(
  selectCurrentItemIngredientIds,
  selectCurrentItemPrice,
  selectSelectedItemGroup,
  selectOrderItemQuantity,
  (ingredients, price, group, quantity) => (
    // {
    //   id: 'string',
    //   name: 'string',
    //   ingredients: ingredients,
    //   itemGroup: group,
    //   price: price,
    //   quantity: quantity,
    //   subtotal: price * quantity
    // }
    { name: 'bruce' }
  )
)

export const selectCurrentOrderItems = createSelector(
  selectCartState,
  (state) => state.orderItems
)
