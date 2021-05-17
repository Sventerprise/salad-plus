import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartTotal } from '../../../order/state/cart/cart.selectors';
import { updateHeader } from '../../../shared/state/shared.actions';
import { ccData } from '../../models/CCData';
import { clearPaymentInfo, postPayment, updateCCInfo } from '../../state/payment.actions';
import { selectPaymentState } from '../../state/payment.selectors';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
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
    this.store.select(selectPaymentState).subscribe(state => {
      if (state.name) {
        this.paymentForm.controls['name'].setValue(state.name)
      }
      if (state.number) {
        this.paymentForm.controls['number'].setValue(state.number)
      }
      if (state.cvv) {
        this.paymentForm.controls['cvv'].setValue(state.cvv)
      }
      if (state.exp) {
        this.paymentForm.controls['exp'].setValue(state.exp)
      }
    })
  }

  public openCancelConfirm() {
    this.popupFlag = true
    this.confirmFlag = true
  }

  public confirmCancel() {
    this.store.dispatch(clearPaymentInfo())
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
    this.store.dispatch(postPayment({ data: ccInfo }))
  }

}
