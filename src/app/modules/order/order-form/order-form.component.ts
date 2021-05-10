import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { selectAllIngredients } from 'src/app/stores/selectors/order-static-data.selectors';
import { IngredientList } from '../models/Ingredient';
import { OrderItem, OrderItems } from '../models/Item';
import { removeCartItem, updateTotal } from '../state/cart/cart.actions';
import { State } from '../state/cart/cart.reducer';
import { selectCartItemArray, selectCartState } from '../state/cart/cart.selectors';
import { toggleDetail } from '../state/order-items/order-items.actions';
import { selectOrderItemArray, selectOrderItemEntities, selectOrderItemNames } from '../state/order-items/order-items.selectors';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  cart: State
  items$: Observable<OrderItem[]>
  ingredientsByName$: Observable<Array<{ [id: string]: string[] }>>

  view1: boolean = false

  constructor(
    private store: Store<{}>,
    private cartService: CartService
  ) { }


  ngOnInit(): void {
    this.store.select(selectCartState).subscribe(cart => {
      this.cart = cart
    })
    this.items$ = this.store.select(selectCartItemArray)
    this.ingredientsByName$ = this.store.select(selectOrderItemNames)
  }

  public toggleDetail(id: string) {
    this.store.dispatch(toggleDetail({ id }))
  }

  public removeCartItem(id: string) {
    this.cartService.removeCartItem(id)
  }

  // public getIngredientList(list: string): string[] {
  //   let ingredientList: IngredientList
  //   this.store.select(selectAllIngredients).subscribe(ingredients =>
  //     ingredientList = ingredients.filter(ingredient =>
  //       list.includes(ingredient.id)
  //     )
  //   )
  //   let ingredientNames: string[]
  //   for (let ingredient of ingredientList) {
  //     ingredientNames.push(ingredient.name)
  //   }
  //   return ingredientNames
  // }

}
