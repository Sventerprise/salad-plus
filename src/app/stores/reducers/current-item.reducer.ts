import { createReducer, on } from '@ngrx/store';
import { IngredientList, Ingredients } from 'src/app/modules/order/models/Ingredient';
import { Specialty } from 'src/app/modules/order/models/Specialty';
import * as CurrentItemActions from '../actions/current-item.actions';

export const currentItemFeatureKey = 'currentItem';

export interface State {
  selectedItemGroup: string,
  selectedSpecialty: Specialty,
  specialtyIngredients: IngredientList
  currentItemIngredients: IngredientList
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
  currentItemIngredients: [],
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
  on(CurrentItemActions.setItemIngredientsFromSpecialty,
    (state, action) => (
      { ...state, currentItemIngredients: action.initialIngredients })
  ),
  on(CurrentItemActions.updateItemIngredients,
    (state, action) => (
      { ...state, currentItemIngredients: action.list })
  ),

  on(CurrentItemActions.commitChanges,
    (state, action) => (
      { ...state, currentItemIngredients: action.ingredients })
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

