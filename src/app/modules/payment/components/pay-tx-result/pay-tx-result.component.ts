import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderItemDetailed } from 'src/app/modules/order/models/Item';
import { selectCartItemsWithIngredientInfo } from 'src/app/modules/order/state/cart/cart.selectors';
import { updateHeader } from '../../../shared/state/shared.actions';
import { trxnResult } from '../../models/TrxnResult';
import { selectPayResult } from '../../state/payment.selectors';

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
    this.payResult$ = this.store.select(selectPayResult)
    this.payResult$.subscribe(result =>
      this.paySuccessFlag = result.status == 'approved'
        ? true
        : false
    )
    if (this.result == undefined) {
      this.router.navigate(['/pay'])
    } else {
      this.result.status === 'approved'
        ? this.store.dispatch(updateHeader({ header: 'Success!' }))
        : this.store.dispatch(updateHeader({ header: 'Oops!' }))
    }
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
}
