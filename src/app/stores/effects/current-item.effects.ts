import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as CurrentItemActions from '../actions/current-item.actions';



@Injectable()
export class CurrentItemEffects {

  loadCurrentItems$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(CurrentItemActions.loadCurrentItems),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => CurrentItemActions.loadCurrentItemsSuccess({ data })),
          catchError(error => of(CurrentItemActions.loadCurrentItemsFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
