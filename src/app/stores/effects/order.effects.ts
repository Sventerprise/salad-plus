import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as OrderActions from '../actions/order.actions';



@Injectable()
export class OrderEffects {

  loadOrders$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(OrderActions.loadOrders),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => OrderActions.loadOrdersSuccess({ data })),
          catchError(error => of(OrderActions.loadOrdersFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
