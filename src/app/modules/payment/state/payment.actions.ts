import { createAction, props } from '@ngrx/store';
import { ccData } from '../models/CCData';

export const updateCCInfo = createAction(
  '[Payment] Update Payment Form',
  props<{ data: ccData }>()
);
export const updateName = createAction(
  '[Payment] Update Payment Form',
  props<{ name: string }>()
);

export const clearPaymentInfo = createAction(
  '[Payment Results] Clear All Payment Info'
);

export const postPayment = createAction(
  '[Payment] Payment to Server',
  props<{ data: any }>()
);

export const postPaymentSuccess = createAction(
  '[Payment] Payment Success',
  props<{ data: any }>()
);

export const postPaymentFailure = createAction(
  '[Payment] Payment Failure',
  props<{ error: any }>()
);



// boilerplate

export const loadPayments = createAction(
  '[Payment] Load Payments'
);

export const loadPaymentsSuccess = createAction(
  '[Payment] Load Payments Success',
  props<{ data: any }>()
);

export const loadPaymentsFailure = createAction(
  '[Payment] Load Payments Failure',
  props<{ error: any }>()
);
