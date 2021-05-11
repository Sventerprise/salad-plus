import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { OrderItem } from '../models/Item';
import { State } from '../state/cart/cart.reducer';
import { selectCartItemArray, selectCartState } from '../state/cart/cart.selectors';
import { toggleDetail, updateQuantityAndSubtotal } from '../state/order-items/order-items.actions';
import { selectOrderItemNames } from '../state/order-items/order-items.selectors';

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

  public updateQuantityAndSubtotal(e: any, id: string) {
    let quantity = e.value
    this.store.dispatch(updateQuantityAndSubtotal({ quantity, id }))
    this.cartService.updateTotal()
  }

}
