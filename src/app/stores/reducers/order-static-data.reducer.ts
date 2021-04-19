import { Action, createReducer, on } from '@ngrx/store';
import { OrderStaticData } from 'src/app/modules/order/models/OrderStaticData';
import * as OrderStaticDataActions from '../actions/order-static-data.actions';

export const orderStaticDataFeatureKey = 'orderStaticData';

export interface State extends OrderStaticData {

}

export const initialState: State = {
  specialties: [],
  ingredients: [],
  foodTypes: {},
  desserts: [],
  drinks: [],
  sides: [],
};


export const reducer = createReducer(
  initialState,

  on(OrderStaticDataActions.loadStaticOrderDataSuccess, (state, action) => {
    return action.data
  }
  ),
  on(OrderStaticDataActions.loadStaticOrderDataFailure, (state, action) => state),

);

