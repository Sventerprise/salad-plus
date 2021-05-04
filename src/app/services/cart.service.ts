import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IngredientList, Ingredients, IngredientTypes } from '../modules/order/models/Ingredient';
import { Item, OrderItem } from '../modules/order/models/Item';
import { ItemGroup } from '../modules/order/models/ItemGroup';
import { selectCurrentItemIngredients, selectCurrentItemState, selectSelectedItemGroup } from '../modules/order/state/current-item/current-item.selectors';
import { selectAllIngredients, selectIngredientTypes } from '../stores/selectors/order-static-data.selectors';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private store: Store<{}>
  ) { }



  public calculateItemPrice(itemIngredients: IngredientList): number {
    let totalPrice: number = 0
    let allIngredients: IngredientList
    let ingredientTypes: IngredientTypes

    // get all ingredients & their type info
    this.store.select(selectAllIngredients).subscribe(ingredients =>
      allIngredients = ingredients
    )
    this.store.select(selectIngredientTypes).subscribe(types =>
      ingredientTypes = types
    )

    // look up each specialty ingredient to get type
    itemIngredients.forEach(itemIngredient => {
      let currentIngredient = allIngredients.find(ingredient =>
        itemIngredient.id === ingredient.id
      )
      // return the price and add to the running total
      totalPrice += +ingredientTypes[currentIngredient.type].price
    });
    return totalPrice
  }

  public buildOrderItem(price: number): OrderItem {
    let orderItem: OrderItem
    let itemGroup: ItemGroup

    this.store.select(selectSelectedItemGroup).subscribe(group =>
      itemGroup = group)

    // create an item-id-only list (Ingredients)
    let itemIngredients: Ingredients = []
    this.store.select(selectCurrentItemIngredients).subscribe(ingredients =>
      ingredients.forEach(ingredient => itemIngredients.push(ingredient.id)
      )
    )
    // all all the properties to the OrderItem object
    this.store.select(selectCurrentItemState).subscribe(state =>
      orderItem = {
        id: "1",
        name: "1-1",
        ingredients: itemIngredients,
        itemGroup: itemGroup,
        subtotal: price,
        quantity: 1
      }
    )
    console.log(orderItem)
    return orderItem
  }

  private generateId() {

  }

  private generateName() {

  }
}
