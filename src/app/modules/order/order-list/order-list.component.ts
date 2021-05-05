import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartService } from 'src/app/services/cart.service';
import { updateHeader } from '../../shared/state/shared.actions';
import { State } from '../state/cart/cart.reducer';
import { selectCartState, selectOrderTotal } from '../state/cart/cart.selectors';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  confirmFlag: boolean = false
  popupFlag: boolean = false
  cart: State
  total: string

  constructor(
    private store: Store<{}>,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(updateHeader({ header: 'Review and/or Order More' }))
    this.store.select(selectCartState).subscribe(cart => {
      this.cart = cart
    })
    this.store.select(selectOrderTotal).subscribe(total =>
      this.total = total.toFixed(2))
  }

  public openCancelConfirm() {
    this.popupFlag = true
    this.confirmFlag = true
  }

  public confirmCancel() {
  }

  public closePopup() {
    this.popupFlag = false
    this.confirmFlag = false
  }
}
