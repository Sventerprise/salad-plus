import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as OrderItemsActions from './order-items.actions';


@Injectable()
export class OrderItemsEffects {


  loadOrderItems$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(OrderItemsActions.loadOrderItems),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });


  constructor(private actions$: Actions) { }

}
