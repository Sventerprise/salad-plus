import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPayment from './payment.reducer';

export const selectPaymentState = createFeatureSelector<fromPayment.State>(
  fromPayment.paymentFeatureKey
);

