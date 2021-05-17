import { createReducer, on } from '@ngrx/store';
import { trxnResult } from '../models/TrxnResult';
import * as PaymentActions from './payment.actions';

export const paymentFeatureKey = 'payment';

export interface State {
  name: string,
  number: string,
  cvv: string,
  exp: string,
  amount: number,
  result: trxnResult
}

export const initialState: State = {
  name: null,
  number: null,
  cvv: null,
  exp: null,
  amount: null,
  result: undefined
};


export const reducer = createReducer(
  initialState,
  on(PaymentActions.updateCCInfo,
    (state, action) => ({
      ...state,
      name: action.data.name,
      number: action.data.number,
      exp: action.data.exp,
      cvv: action.data.cvv
    })
  ),
  on(PaymentActions.clearPaymentInfo,
    () => ({ ...initialState })
  ),
  on(PaymentActions.postPaymentSuccess,
    (state, action) => ({ ...state, result: action.data })
  ),
  on(PaymentActions.postPaymentFailure,
    (state, action) => ({ ...state, error: action.error })
  )

);

