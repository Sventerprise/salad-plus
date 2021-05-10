import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { OrderItem, OrderItems } from '../models/Item';
import { removeCartItem, updateTotal } from '../state/cart/cart.actions';
import { State } from '../state/cart/cart.reducer';
import { selectCartItemArray, selectCartState } from '../state/cart/cart.selectors';
import { selectOrderItemArray } from '../state/order-items/order-items.selectors';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  cart: State
  items$: Observable<OrderItem[]>

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
    this.items$.subscribe(items =>
      console.log(items))
  }

  public viewDetail() {
    this.view1 = true
  }

  public hideDetail() {
    this.view1 = false
  }

  public removeCartItem(id: string) {
    this.cartService.removeCartItem(id)
  }

}

