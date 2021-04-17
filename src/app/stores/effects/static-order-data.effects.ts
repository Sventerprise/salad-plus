import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as StaticOrderDataActions from '../actions/static-order-data.actions';



@Injectable()
export class StaticOrderDataEffects {

  loadStaticOrderDatas$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(StaticOrderDataActions.loadStaticOrderDatas),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => StaticOrderDataActions.loadStaticOrderDatasSuccess({ data })),
          catchError(error => of(StaticOrderDataActions.loadStaticOrderDatasFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
