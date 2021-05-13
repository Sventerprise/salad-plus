import { createReducer, on } from '@ngrx/store';
import * as PaymentActions from './payment.actions';

export const paymentFeatureKey = 'payment';

export interface State {
  name: string,
  number: string,
  csv: string,
  exp: string,
  isValid: boolean
  // result: {
  //   id: string,
  //   status: string
  // }
  // error: any
}

export const initialState: State = {
  name: null,
  number: null,
  csv: null,
  exp: null,
  isValid: false,
  // result: {
  //   id: '',
  //   status: 'incomplete'
  // },
  // error: undefined
};


export const reducer = createReducer(
  initialState,

  // on(PaymentActions.updatePaymentForm,
  //   (state, action) => ({
  //     ...state,
  // Name: action.paymentForm.controls['Name'].value,
  //   Number: action.paymentForm.controls['Number'].value,
  //   Csv: action.paymentForm.controls['Csv'].value,
  //   Exp: action.paymentForm.controls['Exp'].value,
  //   isValid: action.paymentForm.valid
  // })
  // ),
  on(PaymentActions.updateCCInfo,
    (state, action) => ({
      ...state,
      name: action.name,
      number: action.number,
      exp: action.exp,
      csv: action.csv
    })
  ),
  on(PaymentActions.clearCCInfo,
    () => ({ ...initialState })
  ),
  on(PaymentActions.postPaymentSuccess,
    (state, action) => ({ ...state, result: action.data })
  ),
  on(PaymentActions.postPaymentFailure,
    (state, action) => ({ ...state, error: action.error }))

);

