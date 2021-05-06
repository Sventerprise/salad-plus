import { createReducer, on } from '@ngrx/store';
import { IngredientList } from 'src/app/modules/order/models/Ingredient';
import * as ItemEditActions from './item-edit.actions';

export const itemEditFeatureKey = 'itemEdit';

export interface State {
  // list of ingredient options for selection on edit:
  selectedIngredientsOfType: IngredientList
  ingredientType: string
  selectorFlag: boolean
}

export const initialState: State = {
  selectedIngredientsOfType: [],
  ingredientType: '',
  selectorFlag: false,
};


export const reducer = createReducer(
  initialState,


  on(ItemEditActions.updateTempIngredientsOfType,
    (state, action) => (
      { ...state, selectedIngredientsOfType: action.selectedIngredientsOfType })
  ),
  on(ItemEditActions.updateEditIngredientType,
    (state, action) => (
      { ...state, ingredientType: action.ingredientType })
  ),
  // open/close selector popup
  on(ItemEditActions.openIngredientSelectorPopup,
    (state) => (
      { ...state, selectorFlag: true })
  ),
  on(ItemEditActions.closeIngredientSelectorPopup,
    (state) => (
      { ...state, selectorFlag: false })
  ),
  // ingredient selector (de)select ingredients
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

