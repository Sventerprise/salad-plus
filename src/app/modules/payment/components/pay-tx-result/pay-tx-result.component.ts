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
import { addOrderItem } from 'src/app/modules/order/state/order-items/order-items.actions';
import { addCartItem } from 'src/app/modules/order/state/cart/cart.actions';
import { postPayment, updateCCInfo } from '../../state/payment.actions';
import { ccData } from '../../models/CCData';

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


  constructor(
    private store: Store<{}>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.select(selectOrderItemEntities).subscribe(entities => {
      if (_.size(entities) == 0) {
        this.store.dispatch(addOrderItem({
          orderItem: {

            id: 'sandwich-1',
            name: 'Test Sandwich 1',
            ingredients: [
              'sourdough',
              'ham',
              'cheddar'
            ],
            itemGroup: 'sandwich',
            price: 9.69,
            quantity: 1,
            subtotal: 9.69,
            viewDetail: false

          }
        }))
        this.store.dispatch(addCartItem({ id: 'sandwich-1' }))
        this.store.dispatch(addOrderItem({
          orderItem: {

            id: 'salad-1',
            name: 'Test Salad 1',
            ingredients: [
              'mixed_greens',
              'ham',
              'blue_cheese'
            ],
            itemGroup: 'salad',
            price: 13.50,
            quantity: 2,
            subtotal: 27.00,
            viewDetail: false

          }
        }))
        this.store.dispatch(addCartItem({ id: 'salad-1' }))
      }
    })

    if (this.payResult$ == undefined) {
      // this.router.navigate(['/pay'])
      let ccInfo: ccData = {
        name: 'abc132',
        number: '1234567890',
        cvv: '123',
        exp: '1983-12-12',
        amount: 15.02
      }
      this.store.dispatch(updateCCInfo({ data: ccInfo }))
      this.store.dispatch(postPayment({ data: ccInfo }))

    } else {
      this.paySuccessFlag
        ? this.store.dispatch(updateHeader({ header: 'Success!' }))
        : this.store.dispatch(updateHeader({ header: 'Oops!' }))
    }

    this.payResult$ = this.store.select(selectPayResult)
    this.payResult$.subscribe(result =>
      this.paySuccessFlag = result.status == 'approved'
        ? true
        : false
    )
    this.items$ = this.store.select(selectCartItemsWithIngredientInfo)
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

  // dev
  public flipResults() {
    this.paySuccessFlag = !this.paySuccessFlag
  }
}
