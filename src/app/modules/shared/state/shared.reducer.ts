import { Action, createReducer, on } from '@ngrx/store';
import * as SharedActions from './shared.actions';

export const sharedFeatureKey = 'shared';

export interface State {
  headerMessage: string
}

export const initialState: State = {
  headerMessage: 'The Header Is Broken'
};


export const reducer = createReducer(
  initialState,

  on(SharedActions.updateHeader, (state, action) => ({
    ...state,
    headerMessage: action.header
  })),

);

