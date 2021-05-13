import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartTotal } from '../../order/state/cart/cart.selectors';
import { updateHeader } from '../../shared/state/shared.actions';
import { clearCCInfo, updateCCInfo } from '../state/payment.actions';

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
    csv: ['', [Validators.required, Validators.pattern("[0-9]{3}")]],
    exp: ['', [Validators.required]]
  })
  isValid: boolean

  constructor(
    private store: Store<{}>,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.dispatch(updateHeader({ header: 'Payment' }))
    this.total$ = this.store.select(selectCartTotal)
    this.isValid = this.paymentForm.valid
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
    // let formData: CCData = {}
    this.store.dispatch(updateCCInfo({
      name: this.paymentForm.controls['name'].value,
      number: this.paymentForm.controls['number'].value,
      csv: this.paymentForm.controls['csv'].value,
      exp: this.paymentForm.controls['exp'].value,
    }))
  }

}
