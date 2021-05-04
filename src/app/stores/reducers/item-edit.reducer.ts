import { Action, createReducer, on } from '@ngrx/store';
import { IngredientList } from 'src/app/modules/order/models/Ingredient';
import * as ItemEditActions from '../actions/item-edit.actions';

export const itemEditFeatureKey = 'itemEdit';

export interface State {
  // list of ingredient options for selection on edit:
  selectedIngredientsOfType: IngredientList
  allIngredientsOfType: IngredientList
  selectorFlag: boolean
}

export const initialState: State = {
  selectedIngredientsOfType: [],
  allIngredientsOfType: [],
  selectorFlag: false,
};


export const reducer = createReducer(
  initialState,


  on(ItemEditActions.updateTempIngredientsOfType,
    (state, action) => (
      { ...state, selectedIngredientsOfType: action.selectedIngredientsOfType })
  ),
  on(ItemEditActions.updateAllIngredientsOfType,
    (state, action) => (
      { ...state, allIngredientsOfType: action.allIngredientsOfType })
  ),
  on(ItemEditActions.openIngredientSelectorPopup,
    (state) => (
      { ...state, selectorFlag: true })
  ),
  on(ItemEditActions.closeIngredientSelectorPopup,
    (state) => (
      { ...state, selectorFlag: false })
  ),

  on(ItemEditActions.clearSelectedIngredients,
    (state) => (
      { ...state, selectedIngredientsOfType: [] })
  ),
  on(ItemEditActions.addSelectedIngredient,
    (state, action) => (
      { ...state, selectedIngredientsOfType: action.ingredients })
  ),
  on(ItemEditActions.removeSelectedIngredient,
    (state, action) => (
      { ...state, selectedIngredientsOfType: action.ingredients })
  ),

);

