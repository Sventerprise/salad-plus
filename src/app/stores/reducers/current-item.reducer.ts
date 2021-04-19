import { Action, createReducer, on } from '@ngrx/store';
import * as CurrentItemActions from '../actions/current-item.actions';

export const currentItemFeatureKey = 'currentItem';

export interface State {

}

export const initialState: State = {

};


export const reducer = createReducer(
  initialState,

  on(CurrentItemActions.loadCurrentItems, state => state),
  on(CurrentItemActions.loadCurrentItemsSuccess, (state, action) => state),
  on(CurrentItemActions.loadCurrentItemsFailure, (state, action) => state),

);

