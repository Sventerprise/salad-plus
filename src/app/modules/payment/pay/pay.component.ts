import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartTotal } from '../../order/state/cart/cart.selectors';
import { updateHeader } from '../../shared/state/shared.actions';
import { clearCCInfo, updatePaymentForm } from '../state/payment.actions';

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
    ccName: ['', Validators.required],
    ccNumber: ['', [
      Validators.required,
      Validators.pattern("[0-9]{10}")
    ]],
    ccCsv: ['', [Validators.required, Validators.pattern("[0-9]{3}")]],
    ccExp: ['', [Validators.required]]
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
    this.store.dispatch(updatePaymentForm({ paymentForm: this.paymentForm }))
    // this.paymentForm.valid
  }

}
