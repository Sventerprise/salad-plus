import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { OrderItems } from '../models/Item';
import { State } from '../state/cart/cart.reducer';
import { selectCartState } from '../state/cart/cart.selectors';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  cart: State
  items: OrderItems

  view1: boolean = false

  constructor(
    private store: Store<{}>,
  ) { }


  ngOnInit(): void {
    this.store.select(selectCartState).subscribe(cart => {
      this.cart = cart
      this.items = cart.orderItems
    })
  }

  viewDetail() {
    // TODO set store item view to True
    this.view1 = true
  }

  hideDetail() {
    // TODO set store item view to True
    this.view1 = false
  }

}
