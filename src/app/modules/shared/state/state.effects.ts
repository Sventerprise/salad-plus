import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as StateActions from './state.actions';


@Injectable()
export class StateEffects {


  loadStates$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(StateActions.loadStates),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    );
  });


  constructor(private actions$: Actions) {}

}
