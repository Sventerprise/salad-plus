import { createReducer, on } from '@ngrx/store';
import * as PaymentActions from './payment.actions';

export const paymentFeatureKey = 'payment';

export interface State {
  ccName: string,
  ccNumber: number,
  ccCsv: number,
  ccExp: string,
  isValid: boolean
}

export const initialState: State = {
  ccName: null,
  ccNumber: null,
  ccCsv: null,
  ccExp: null,
  isValid: false
};


export const reducer = createReducer(
  initialState,

  on(PaymentActions.loadPayments, state => state),
  on(PaymentActions.loadPaymentsSuccess, (state, action) => state),
  on(PaymentActions.loadPaymentsFailure, (state, action) => state),

  on(PaymentActions.updatePaymentForm,
    (state, action) => ({
      ...state,
      ccName: action.paymentForm.controls['ccName'].value,
      ccNumber: action.paymentForm.controls['ccNumber'].value,
      ccCsv: action.paymentForm.controls['ccCsv'].value,
      ccExp: action.paymentForm.controls['ccExp'].value,
      isValid: action.paymentForm.valid,
    })),
  on(PaymentActions.clearCCInfo,
    () => ({ ...initialState }))

);

