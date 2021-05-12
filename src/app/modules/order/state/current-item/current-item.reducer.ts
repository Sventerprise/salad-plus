import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { IngredientList } from 'src/app/modules/order/models/Ingredient';
import { Specialty } from 'src/app/modules/order/models/Specialty';
import { OrderItem } from '../../models/Item';
import { ItemGroup } from '../../models/ItemGroup';
import * as CurrentItemActions from './current-item.actions';

export const currentItemFeatureKey = 'currentItem';

export interface State extends OrderItem {
  selectedSpecialtyId: string,
}

export const initialState: State = {
  id: '',
  name: '',
  itemGroup: null,
  quantity: 1,
  price: 0,
  subtotal: 0,
  selectedSpecialtyId: null,
  ingredients: [],
  viewDetail: false
};


export const reducer = createReducer(
  initialState,

  on(CurrentItemActions.setItemGroup,
    (state, action) => (
      { ...state, itemGroup: action.currentItemGroup })
  ),
  on(CurrentItemActions.updateSpecialtyId,
    (state, action) => (
      { ...state, selectedSpecialtyId: action.selectedSpecialtyId }
    )
  ),
  on(CurrentItemActions.updateIngredients,
    (state, action) => (
      { ...state, ingredients: action.ingredients })
  ),
  on(CurrentItemActions.loadItemToBuilder,
    (state, action) => (
      {
        ...state,
        id: action.orderItem.id,
        name: action.orderItem.name,
        itemGroup: action.orderItem.itemGroup,
        quantity: action.orderItem.quantity,
        price: action.orderItem.price,
        subtotal: action.orderItem.subtotal,
        selectedSpecialtyId: null,
        ingredients: action.orderItem.ingredients,
        viewDetail: false
      })
  ),
  on(CurrentItemActions.clearCurrentItem,
    () => (
      { ...initialState })
  ),
  on(CurrentItemActions.updateCurrentItemId,
    (state, action) => ({
      ...state,
      id: action.id
    })
  ),
  on(CurrentItemActions.updateCurrentItemName,
    (state, action) => ({
      ...state,
      name: action.name
    })
  ),
  on(CurrentItemActions.updateCurrentItemPriceAndSubtotal,
    (state, action) => ({
      ...state,
      price: action.price,
      subtotal: action.price * state.quantity
    })
  ),

);

