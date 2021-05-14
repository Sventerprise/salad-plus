import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as PaymentActions from './payment.actions';
import { PaymentService } from '../payment.service';



@Injectable()
export class PaymentEffects {

  payResult$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.postPayment),
      mergeMap((action) =>
        this.payService.getPayResultsDB(action.data).pipe(
          map(data => PaymentActions.postPaymentSuccess({ data })),
          catchError(error => of(PaymentActions.postPaymentFailure({ error }))))
      )
    )
  )

  constructor(private actions$: Actions,
    private payService: PaymentService) { }

}
