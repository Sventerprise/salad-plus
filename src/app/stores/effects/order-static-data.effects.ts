import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as StaticOrderDataActions from '../actions/order-static-data.actions';
import { OrderStaticDataService } from 'src/app/app/services/OrderStaticData.service';



@Injectable()
export class OrderStaticDataEffects {

  loadOrderStaticData$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StaticOrderDataActions.loadStaticOrderData),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.service.getOrderStaticData().pipe(
          map(data => StaticOrderDataActions.loadStaticOrderDataSuccess({ data })),
          catchError(error => of(StaticOrderDataActions.loadStaticOrderDataFailure({ error }))))
      )
    );
  });



  constructor(
    private actions$: Actions,
    private service: OrderStaticDataService) { }

}
