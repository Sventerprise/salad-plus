import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrderStaticData from '../reducers/order-static-data.reducer';

export const selectOrderStaticDataState = createFeatureSelector<fromOrderStaticData.State>(
  fromOrderStaticData.orderStaticDataFeatureKey
);

export const selectSpecialties = createSelector(
  selectOrderStaticDataState,
  (state) => state.specialties
)

export const selectIngredients = createSelector(
  selectOrderStaticDataState,
  (state) => state.ingredients
)

export const selectDrinks = createSelector(
  selectOrderStaticDataState,
  (state) => state.drinks
)

export const selectFoodTypes = createSelector(
  selectOrderStaticDataState,
  (state) => state.foodTypes
)

export const selectSides = createSelector(
  selectOrderStaticDataState,
  (state) => state.sides
)
