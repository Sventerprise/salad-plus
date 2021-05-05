import { createReducer, on } from '@ngrx/store';
import { IngredientList } from 'src/app/modules/order/models/Ingredient';
import { Specialty } from 'src/app/modules/order/models/Specialty';
import { ItemGroup } from '../../models/ItemGroup';
import * as CurrentItemActions from './current-item.actions';

export const currentItemFeatureKey = 'currentItem';

export interface State {
  selectedItemGroup: ItemGroup,
  selectedSpecialtyId: string,
  currentItemIngredients: IngredientList
}

export const initialState: State = {
  selectedItemGroup: null,
  selectedSpecialtyId: null,
  currentItemIngredients: [],
};


export const reducer = createReducer(
  initialState,

  on(CurrentItemActions.setItemGroup,
    (state, action) => (
      { ...state, selectedItemGroup: action.selectedItemGroup })
  ),
  on(CurrentItemActions.updateSpecialtyId,
    (state, action) => (
      { ...state, selectedSpecialtyId: action.selectedSpecialtyId }
    )
  ),
  on(CurrentItemActions.updateCurrentItemIngredients,
    (state, action) => (
      { ...state, currentItemIngredients: action.ingredients })
  ),
  on(CurrentItemActions.commitChanges,
    (state, action) => (
      { ...state, currentItemIngredients: action.ingredients })
  ),
  on(CurrentItemActions.clearCurrentItem,
    (state) => (
      {
        ...state,
        selectedItemGroup: null,
        selectedSpecialtyId: null,
        currentItemIngredients: []
      })
  ),

);

