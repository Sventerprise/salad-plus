import { FormGroup } from '@angular/forms';
import { createAction, props } from '@ngrx/store';


export const updatePaymentForm = createAction(
  '[Payment] Update Payment Form',
  props<{ paymentForm: FormGroup }>()
);

export const clearCCInfo = createAction(
  '[Payment] Clear CC Info'
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
