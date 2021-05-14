import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartTotal } from '../../../order/state/cart/cart.selectors';
import { updateHeader } from '../../../shared/state/shared.actions';
import { ccData } from '../../models/CCData';
import { clearCCInfo, postPayment, updateCCInfo } from '../../state/payment.actions';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  confirmFlag: boolean = false
  popupFlag: boolean = false
  total$: Observable<number>
  paymentForm = this.fb.group({
    name: ['', Validators.required],
    number: ['', [
      Validators.required,
      Validators.pattern("[0-9]{10}")
    ]],
    cvv: ['', [
      Validators.required,
      Validators.pattern("[0-9]{3}")
    ]],
    exp: ['', [Validators.required]]
  })

  constructor(
    private store: Store<{}>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.store.dispatch(updateHeader({ header: 'Payment' }))
    this.total$ = this.store.select(selectCartTotal)
  }

  public openCancelConfirm() {
    this.popupFlag = true
    this.confirmFlag = true
  }

  public confirmCancel() {
    this.store.dispatch(clearCCInfo())
  }

  public closePopup() {
    this.popupFlag = false
    this.confirmFlag = false
  }

  public submit() {
    // this.store.dispatch(updatePaymentForm({ paymentForm: this.paymentForm }))
    let amount: number
    this.store.select(selectCartTotal).subscribe(total =>
      amount = total
    )
    let ccInfo: ccData = {
      name: this.paymentForm.controls['name'].value,
      number: this.paymentForm.controls['number'].value,
      cvv: this.paymentForm.controls['cvv'].value,
      exp: this.paymentForm.controls['exp'].value,
      amount: amount
    }
    this.store.dispatch(updateCCInfo({ data: ccInfo }))
    console.log('calling postPayment')
    this.store.dispatch(postPayment({ data: ccInfo }))
  }

}
