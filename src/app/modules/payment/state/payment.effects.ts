import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as PaymentActions from './payment.actions';



@Injectable()
export class PaymentEffects {

  loadPayments$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(PaymentActions.loadPayments),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => PaymentActions.loadPaymentsSuccess({ data })),
          catchError(error => of(PaymentActions.loadPaymentsFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
