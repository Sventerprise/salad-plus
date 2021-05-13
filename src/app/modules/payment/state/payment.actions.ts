import { createAction, props } from '@ngrx/store';

export const updateCCInfo = createAction(
  '[Payment] Update Payment Form',
  props<{ name: string, number: string, csv: string, exp: string }>()
);
export const updateName = createAction(
  '[Payment] Update Payment Form',
  props<{ name: string }>()
);

export const clearCCInfo = createAction(
  '[Payment] Clear CC Info'
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
