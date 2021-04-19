import { Action, createReducer, on } from '@ngrx/store';
import * as CurrentItemActions from '../actions/current-item.actions';

export const currentItemFeatureKey = 'currentItem';

export interface State {
  itemGroup: string
}

export const initialState: State = {
  itemGroup: ''
};


export const reducer = createReducer(
  initialState,

  on(CurrentItemActions.setItemGroup,
    (state, action) => {
      return {
        ...state, itemGroup: action.itemGroup
      }
    }
  ),

  // boilerplate
  on(CurrentItemActions.loadCurrentItems, state => state),
  on(CurrentItemActions.loadCurrentItemsSuccess, (state, action) => state),
  on(CurrentItemActions.loadCurrentItemsFailure, (state, action) => state),

);

