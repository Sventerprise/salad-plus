import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, reduce } from 'rxjs/operators';
import { IngredientList, Ingredients, IngredientTypes } from '../modules/order/models/Ingredient';
import { Item, OrderItem, OrderItems } from '../modules/order/models/Item';
import { ItemGroup } from '../modules/order/models/ItemGroup';
import { Specialty } from '../modules/order/models/Specialty';
import { addCartItem, removeCartItem, updateTotal } from '../modules/order/state/cart/cart.actions';
import { State } from '../modules/order/state/cart/cart.reducer';
import { selectCartIds, selectCartState, selectCartTotal } from '../modules/order/state/cart/cart.selectors';
import { selectCurrentItemIngredientIds, selectCurrentItemIngredients, selectCurrentItemPrice, selectCurrentItemState, selectCurrentItemGroup, selectSelectedSpecialty, selectSelectedSpecialtyId, selectSpecialtyIngredients, selectSpecialtyModified, selectCurrentItemQuantity, selectCurrentItemSubtotal } from '../modules/order/state/current-item/current-item.selectors';
import { selectAllIngredients, selectIngredientTypes } from '../stores/selectors/order-static-data.selectors';
import * as _ from 'lodash'
import { selectOrderItemArray, selectOrderItemEntities } from '../modules/order/state/order-items/order-items.selectors';
import { addOrderItem } from '../modules/order/state/order-items/order-items.actions';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: OrderItems
  cart: State
  specialty: Specialty
  group: ItemGroup

  constructor(
    private store: Store<{}>
  ) {
    this.store.select(selectCartState).subscribe(state =>
      this.cart = state
    )
    this.store.select(selectSelectedSpecialty).subscribe(itemSpecialty =>
      this.specialty = itemSpecialty
    )
    this.store.select(selectCurrentItemGroup).subscribe(itemGroup =>
      this.group = itemGroup)
  }
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

  public buildOrderItem(): OrderItem {
    let orderItem: OrderItem
    let itemGroup: ItemGroup
    let price: number
    this.store.select(selectCurrentItemPrice).subscribe(itemPrice =>
      price = itemPrice
    )
    this.store.select(selectCurrentItemGroup).subscribe(group =>
      itemGroup = group
    )
    // create an item-id-only list (Ingredients)
    let itemIngredients: Ingredients = []
    this.store.select(selectCurrentItemIngredientIds).subscribe(ingredients =>
      itemIngredients = ingredients
    )
    // all the properties to the OrderItem object
    orderItem = {
      id: this.generateId(),
      name: this.generateName(),
      ingredients: itemIngredients,
      itemGroup: itemGroup,
      price: price,
      subtotal: price,
      quantity: 1,
      viewDetail: false
    }
    return orderItem
  }

  public generateId(): string {
    let unique: boolean
    let i: number = 1
    let id: string
    do {
      unique = true
      id = this.group + "-" + i
      this.store.select(selectOrderItemArray).subscribe(orderItems =>
        orderItems.find(existingItem =>
          existingItem.id === id ? unique = false : null
        )
      )
      i++
    } while (!unique)
    return id
  }

  public generateName(): string {
    let name: string
    let modified: boolean
    this.store.select(selectSpecialtyModified).subscribe(itemModified =>
      modified = itemModified)
    // TODO: check to ensure specialties are properly cleared
    if (this.specialty) {
      if (modified) {
        name = 'Custom ' + this.specialty.name
      } else {
        name = this.specialty.name
      }
    } else {
      name = 'Custom ' + this.group
    }
    return name
  }

  public updateTotal(): void {
    let total: number = 0
    this.store.select(selectCartTotal).subscribe(cartTotal =>
      total = cartTotal)
    this.store.dispatch(updateTotal({ total }))
  }

  public removeCartItem(id: string): void {
    // get the current cart item list
    let orderItemIds: string[]
    this.store.select(selectCartIds).subscribe(ids =>
      // and remove the selected id
      orderItemIds = ids.filter(cartId => cartId != id)
    )
    // tell the store
    this.store.dispatch(removeCartItem({ orderItemIds }))
    // update total
    this.updateTotal()
  }

  public addOrderItem(): void {
    // build item... probably delete (done in reducer)
    let currentIngredients: string[]
    let group: ItemGroup
    let price, quantity, subtotal: number
    this.store.select(selectCurrentItemIngredientIds).subscribe(ids =>
      currentIngredients = ids
    )
    this.store.select(selectCurrentItemGroup).subscribe(thisGroup =>
      group = thisGroup
    )
    this.store.select(selectCurrentItemPrice).subscribe(thisPrice =>
      price = thisPrice
    ),
      this.store.select(selectCurrentItemQuantity).subscribe(thisQuantity =>
        quantity = thisQuantity
      )
    this.store.select(selectCurrentItemSubtotal).subscribe(thisSubtotal =>
      subtotal = thisSubtotal
    )

    let orderItem: OrderItem
    orderItem = Object.assign({},
      {
        id: this.generateId(),
        name: this.generateName(),
        ingredients: currentIngredients,
        itemGroup: group,
        price: price,
        quantity: quantity,
        subtotal: subtotal,
        viewDetail: false
      }
    )
    this.store.dispatch(addOrderItem({ orderItem }))

    this.addCartItem(orderItem.id)

  }

  public addCartItem(id): void {
    this.store.dispatch(addCartItem({ id }))
  }


}
