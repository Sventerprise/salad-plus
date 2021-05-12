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
import { selectCurrentItemIngredientIds, selectCurrentItemPrice, selectCurrentItemState, selectCurrentItemGroup, selectSelectedSpecialty, selectSelectedSpecialtyId, selectSpecialtyIngredients, selectSpecialtyModified, selectCurrentItemQuantity, selectCurrentItemSubtotal } from '../modules/order/state/current-item/current-item.selectors';
import * as _ from 'lodash'
import { selectOrderItemArray } from '../modules/order/state/order-items/order-items.selectors';
import { addOrderItem } from '../modules/order/state/order-items/order-items.actions';
import { clearCurrentItem } from '../modules/order/state/current-item/current-item.actions';

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
    this.store.select(selectSelectedSpecialty).subscribe(itemSpecialty =>
      this.specialty = itemSpecialty
    )
    this.store.select(selectCurrentItemGroup).subscribe(itemGroup =>
      this.group = itemGroup)
  }

  // public generateId(): string {
  //   let unique: boolean
  //   let i: number = 1
  //   let id: string
  //   do {
  //     unique = true
  //     id = this.group + "-" + i
  //     this.store.select(selectOrderItemArray).subscribe(orderItems =>
  //       orderItems.find(existingItem =>
  //         existingItem.id === id ? unique = false : null
  //       )
  //     )
  //     i++
  //   } while (!unique)
  //   return id
  // }

  // public generateName(): string {
  //   let name: string
  //   let modified: boolean
  //   this.store.select(selectSpecialtyModified).subscribe(itemModified =>
  //     modified = itemModified)
  //   // TODO: check to ensure specialties are properly cleared
  //   if (this.specialty) {
  //     if (modified) {
  //       name = 'Custom ' + this.specialty.name
  //     } else {
  //       name = this.specialty.name
  //     }
  //   } else {
  //     name = 'Custom ' + this.group
  //   }
  //   return name
  // }

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
    let orderItem: OrderItem

    this.store.select(selectCurrentItemState).subscribe(state =>
      orderItem = Object.assign({},
        {
          id: state.id,
          name: state.name,
          ingredients: state.ingredients,
          itemGroup: state.itemGroup,
          price: state.price,
          quantity: state.quantity,
          subtotal: state.subtotal,
          viewDetail: false
        }
      )
    )
    this.store.dispatch(addOrderItem({ orderItem }))
    this.store.dispatch(addCartItem({ id: orderItem.id }))
    this.store.dispatch(clearCurrentItem())

  }
}
