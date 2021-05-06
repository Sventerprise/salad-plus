import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { reduce } from 'rxjs/operators';
import { IngredientList, Ingredients, IngredientTypes } from '../modules/order/models/Ingredient';
import { Item, OrderItem, OrderItems } from '../modules/order/models/Item';
import { ItemGroup } from '../modules/order/models/ItemGroup';
import { Specialty } from '../modules/order/models/Specialty';
import { updateTotal } from '../modules/order/state/cart/cart.actions';
import { State } from '../modules/order/state/cart/cart.reducer';
import { selectCartState, selectOrderItems } from '../modules/order/state/cart/cart.selectors';
import { selectCurrentItemIngredientIds, selectCurrentItemIngredients, selectCurrentItemPrice, selectCurrentItemState, selectSelectedItemGroup, selectSelectedSpecialty, selectSelectedSpecialtyId, selectSpecialtyIngredients, selectSpecialtyModified } from '../modules/order/state/current-item/current-item.selectors';
import { selectAllIngredients, selectIngredientTypes } from '../stores/selectors/order-static-data.selectors';

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
    this.store.select(selectCartState).subscribe(state =>
      this.items = state.orderItems
    )
    this.store.select(selectSelectedSpecialty).subscribe(itemSpecialty =>
      this.specialty = itemSpecialty
    )
    this.store.select(selectSelectedItemGroup).subscribe(itemGroup =>
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
    this.store.select(selectSelectedItemGroup).subscribe(group =>
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
      quantity: 1
    }
    return orderItem
  }

  private generateId(): string {
    let unique: boolean = false
    let i: number = 1
    let id: string
    do {
      id = this.group + "-" + i
      unique = this.cart.orderItems.keys.toString().includes(id)
        ? false
        : true
      i++
    } while (!unique)
    return id
  }

  private generateName(): string {
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
    this.store.select(selectOrderItems).subscribe(items => {
      items.forEach(item =>
        total += item.subtotal
      )
    })
    this.store.dispatch(updateTotal({ total }))
  }
}
