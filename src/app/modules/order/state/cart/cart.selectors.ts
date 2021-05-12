import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAllIngredients } from 'src/app/stores/selectors/order-static-data.selectors';
import { IngredientList } from '../../models/Ingredient';
import { OrderItem, OrderItemDetailed } from '../../models/Item';
import { selectOrderItemEntities } from '../order-items/order-items.selectors';
import * as fromCart from './cart.reducer';

export const selectCartState = createFeatureSelector<fromCart.State>(
  fromCart.cartFeatureKey
);

export const selectCartIds = createSelector(
  selectCartState,
  (state): string[] => state.orderItemIds
);

export const selectCartItemArray = createSelector(
  selectOrderItemEntities,
  selectCartIds,
  (orderEntities, ids): OrderItem[] => {
    let orderItems: OrderItem[] = []
    for (let id of ids) { orderItems.push(orderEntities[id]) }
    return orderItems
  }

);

export const selectCartItemsWithIngredientInfo = createSelector(
  // creates an array of orderItems containing the full ingredient properties to the items
  selectCartItemArray,
  selectAllIngredients,
  (orderItems, allIngredients): OrderItemDetailed[] => {
    let orderItemDetailed: OrderItemDetailed
    let orderItemDetailList: OrderItemDetailed[] = []
    orderItems.forEach(orderItem => {
      let ingredientList: IngredientList = []
      orderItem.ingredients.forEach(ingredientId =>
        ingredientList.push(allIngredients.find(ingredient =>
          ingredient.id === ingredientId
        ))
      )
      let newItem = {
        id: '',
        name: '',
        itemGroup: null,
        quantity: 1,
        price: 0,
        subtotal: 0,
        selectedSpecialtyId: null,
        ingredients: [],
        viewDetail: false,
        ingredientDetails: ingredientList
      };
      orderItemDetailed = Object.assign({}, newItem, orderItem)
      orderItemDetailList.push(orderItemDetailed)
    })
    return orderItemDetailList
  }
)

export const selectCartTotal = createSelector(
  selectOrderItemEntities,
  selectCartIds,
  (orderItems, cartIds): number => {
    let total: number = 0
    cartIds.forEach(cartId =>
      total += orderItems[cartId].subtotal
    )
    return total
  }
);
