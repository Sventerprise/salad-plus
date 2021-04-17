import { Action, createReducer, on } from '@ngrx/store';
import * as StaticOrderDataActions from '../actions/static-order-data.actions';

export const staticOrderDataFeatureKey = 'staticOrderData';

export interface State {

}

export const initialState: State = {

};


export const reducer = createReducer(
  initialState,

  on(StaticOrderDataActions.loadStaticOrderDatas, state => state),
  on(StaticOrderDataActions.loadStaticOrderDatasSuccess, (state, action) => state),
  on(StaticOrderDataActions.loadStaticOrderDatasFailure, (state, action) => state),

);

