import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAllIngredients } from 'src/app/stores/selectors/order-static-data.selectors';
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

export const selectOrderItemNames = createSelector(
  selectAllIngredients,
  selectOrderItemEntities,
  (allIngredients, orderItems): { [key: string]: string[] } => {
    // let ingredientNames: Array<{ [id: string]: string[] }> = []
    let item: { [key: string]: string[] } = {}
    // loop through each order item ingredient list (by id)
    // for each ingredient id ...
    // look up the name in allIngredients
    // set id as the index set name as the value
    for (let itemId in orderItems) {
      let nameList: string[] = []
      // get list of ingredients from the item
      orderItems[itemId].ingredients.forEach(ingredientId => {
        nameList.push(allIngredients.find(ingredient =>
          ingredient.id == ingredientId).name)
      })
      item[itemId] = nameList
      // ingredientNames.push(item)
    }
    return item
  }
)
