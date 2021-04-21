import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { IngredientList, Ingredients } from 'src/app/modules/order/models/Ingredient';
import { Specialty } from 'src/app/modules/order/models/Specialty';
import * as CurrentItemActions from '../actions/current-item.actions';

export const currentItemFeatureKey = 'currentItem';

export interface State {
  selectedItemGroup: string,
  selectedSpecialty: Specialty,
  ingredients: IngredientList
}

export const initialState: State = {
  selectedItemGroup: null,
  selectedSpecialty: null,
  ingredients: []
};


export const reducer = createReducer(
  initialState,

  on(CurrentItemActions.setItemGroup,
    (state, action) => (
      { ...state, selectedItemGroup: action.selectedItemGroup })
  ),
  on(CurrentItemActions.updateSpecialty,
    (state, action) => (
      { ...state, selectedSpecialty: action.selectedSpecialty }
    )
  ),
  on(CurrentItemActions.loadSpecialtyIngredients,
    (state, action) => (
      { ...state, ingredients: action.ingredientList })
  ),

);

