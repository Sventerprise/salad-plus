import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { OrderItems } from '../models/Item';
import { removeCartItem, updateTotal } from '../state/cart/cart.actions';
import { State } from '../state/cart/cart.reducer';
import { selectCartState, selectOrderItems } from '../state/cart/cart.selectors';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  cart: State
  items: OrderItems
  items$: Observable<OrderItems>

  view1: boolean = false

  constructor(
    private store: Store<{}>,
    private cartService: CartService
  ) { }


  ngOnInit(): void {
    this.store.select(selectCartState).subscribe(cart => {
      this.cart = cart
      this.items = cart.orderItems
    })
    // this.cart$ = this.store.select(selectCartState)
    this.items$ = this.store.select(selectOrderItems)
  }

  public viewDetail() {
    this.view1 = true
  }

  public hideDetail() {
    this.view1 = false
  }

  public removeItem(id: string) {
    this.cartService.removeItem(id)
  }

}
