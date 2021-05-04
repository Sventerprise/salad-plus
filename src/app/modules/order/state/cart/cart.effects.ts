import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as CartActions from './cart.actions';



@Injectable()
export class CartEffects {

  // loadCarts$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(CartActions.loadCarts),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => CartActions.loadCartsSuccess({ data })),
  //         catchError(error => of(CartActions.loadCartsFailure({ error }))))
  //     )
  //   );
  // });



  constructor(private actions$: Actions) { }

}
