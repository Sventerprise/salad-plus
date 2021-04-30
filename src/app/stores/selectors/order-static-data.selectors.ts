import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IngredientList, IngredientType } from 'src/app/modules/order/models/Ingredient';
import * as fromOrderStaticData from '../reducers/order-static-data.reducer';

export const selectOrderStaticDataState = createFeatureSelector<fromOrderStaticData.State>(
  fromOrderStaticData.orderStaticDataFeatureKey
);

export const selectSpecialties = createSelector(
  selectOrderStaticDataState,
  (state) => state.specialties
)

export const selectAllIngredients = createSelector(
  selectOrderStaticDataState,
  (state): IngredientList => state.ingredients
)

export const selectDrinks = createSelector(
  selectOrderStaticDataState,
  (state) => state.drinks
)

export const selectIngredientTypes = createSelector(
  selectOrderStaticDataState,
  (state) => state.ingredientTypes
)

export const selectSides = createSelector(
  selectOrderStaticDataState,
  (state) => state.sides
)

