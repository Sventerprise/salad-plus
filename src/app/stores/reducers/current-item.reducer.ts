import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { IngredientList, Ingredients } from 'src/app/modules/order/models/Ingredient';
import { Specialty } from 'src/app/modules/order/models/Specialty';
import * as CurrentItemActions from '../actions/current-item.actions';

export const currentItemFeatureKey = 'currentItem';

export interface State {
  selectedItemGroup: string,
  selectedSpecialty: Specialty,
  specialtyIngredients: IngredientList
  ingredientSelectList: IngredientList
  selectorFlag: boolean
}

export const initialState: State = {
  selectedItemGroup: null,
  selectedSpecialty: {
    id: null,
    name: null,
    ingredients: [],
    itemGroup: null,
    img: '',
    description: ''
  },
  specialtyIngredients: [],
  ingredientSelectList: [],
  selectorFlag: false
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
      { ...state, specialtyIngredients: action.specialtyIngredients })
  ),
  on(CurrentItemActions.updateIngredientSelectList,
    (state, action) => (
      { ...state, ingredientSelectList: action.list })
  ),
  on(CurrentItemActions.openIngredientSelectorPopup,
    (state) => (
      { ...state, selectorFlag: true })
  ),
  on(CurrentItemActions.closeIngredientSelectorPopup,
    (state) => (
      { ...state, selectorFlag: false })
  ),



  on(CurrentItemActions.clearSpecialty,
    (state) => (
      { ...state, ingredients: [] })
  ),
  on(CurrentItemActions.clearSpecialtyIngredients,
    (state) => (
      { ...state, selectedSpecialty: null })
  ),
  on(CurrentItemActions.clearSpecialtyIngredients,
    (state) => (
      { ...state, selectedSpecialty: null })
  ),

);

