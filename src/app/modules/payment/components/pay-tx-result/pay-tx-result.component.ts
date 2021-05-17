import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderItemDetailed } from 'src/app/modules/order/models/Item';
import { selectCartItemsWithIngredientInfo } from 'src/app/modules/order/state/cart/cart.selectors';
import { selectOrderItemEntities, selectOrderItemIds } from 'src/app/modules/order/state/order-items/order-items.selectors';
import { updateHeader } from '../../../shared/state/shared.actions';
import { trxnResult } from '../../models/TrxnResult';
import { selectPayResult } from '../../state/payment.selectors';
import * as _ from 'lodash'
import { addOrderItem, clearOrderItems } from 'src/app/modules/order/state/order-items/order-items.actions';
import { addCartItem, clearCart } from 'src/app/modules/order/state/cart/cart.actions';
import { clearPaymentInfo, postPayment, updateCCInfo } from '../../state/payment.actions';
import { ccData } from '../../models/CCData';
import { clearCurrentItem } from 'src/app/modules/order/state/current-item/current-item.actions';

@Component({
  selector: 'app-pay-tx-result',
  templateUrl: './pay-tx-result.component.html',
  styleUrls: ['./pay-tx-result.component.scss']
})
export class PayTxResultComponent implements OnInit {
  items$: Observable<OrderItemDetailed[]>
  payResult$: Observable<trxnResult>
  result: trxnResult

  paySuccessFlag: boolean = false;
  confirmFlag: boolean = false
  popupFlag: boolean = false
  timeReady: Date


  constructor(
    private store: Store<{}>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.paySuccessFlag
      ? this.store.dispatch(updateHeader({ header: 'Success!' }))
      : this.store.dispatch(updateHeader({ header: 'Oops!' }))

    this.payResult$ = this.store.select(selectPayResult)
    this.payResult$.subscribe(result => {
      if (result) {
        this.paySuccessFlag = result.status == 'approved'
          ? true
          : false
        this.timeReady = this.orderReadyTime(result.dateTime)
      }
    })
    this.items$ = this.store.select(selectCartItemsWithIngredientInfo)
  }

  public openCancelConfirm() {
    this.popupFlag = true
    this.confirmFlag = true
  }

  private orderReadyTime(time: string): Date {
    let processTime = new Date(time)
    let readyTime = processTime.getTime() + 10 * 60000

    return new Date(readyTime)
  }

  public confirmCancel() {
    this.store.dispatch(clearPaymentInfo())
  }

  public closePopup() {
    this.popupFlag = false
    this.confirmFlag = false
  }

  // dev
  public flipResults() {
    this.paySuccessFlag = !this.paySuccessFlag
  }

  clearMemory() {
    this.store.dispatch(clearCart())
    this.store.dispatch(clearOrderItems())
    this.store.dispatch(clearPaymentInfo())
  }
}
