import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Specialties, Specialty } from 'src/app/modules/order/models/Specialty';
import * as fromCurrentItem from './current-item.reducer';
import { selectAllIngredients, selectIngredientTypes, selectSpecialties } from '../../../../stores/selectors/order-static-data.selectors';
import { IngredientList, Ingredients } from '../../models/Ingredient';
import { Item, OrderItem } from '../../models/Item';
import { selectIngredientType, selectSelectedIngredientsOfType } from '../item-edit/item-edit.selectors';

export const selectCurrentItemState = createFeatureSelector<fromCurrentItem.State>(
  fromCurrentItem.currentItemFeatureKey
);

// ------- ITEM PROPERTIES -------
export const selectCurrentItemGroup = createSelector(
  selectCurrentItemState,
  (state) => state.itemGroup
)

// returns a list of specialties with the matching group
// ex: return all sandwiches
export const selectSpecialtiesOfGroup = createSelector(
  selectSpecialties,
  selectCurrentItemGroup,
  (specialties: Specialty[], selectedGroup: string): Specialties =>
    specialties.filter(specialty =>
      specialty.itemGroup === selectedGroup)
)

export const selectCurrentItemIngredients = createSelector(
  selectAllIngredients,
  selectCurrentItemState,
  (allIngredients, state): IngredientList => {
    let ingredientList: IngredientList = []
    for (let ingredientId of state.ingredients) {
      ingredientList.push(allIngredients.find(ingredient =>
        ingredient.id === ingredientId)
      )
    }
    return ingredientList
  }
)

// ------- INGREDIENTS -------
export const selectCurrentItemIngredientIds = createSelector(
  selectCurrentItemIngredients,
  (state): Ingredients => state.map(ingredient => ingredient.id)
)

export const selectSelectedIngredientSelectType = createSelector(
  selectIngredientTypes,
  selectIngredientType,
  (types, type): string => types[type].selectType
)

export const selectCurrentItemPrice = createSelector(
  selectIngredientTypes,
  selectCurrentItemIngredients,
  (types, currentIngredients): number => {
    let totalPrice: number = 0
    currentIngredients.forEach(itemIngredient => {
      totalPrice += +types[itemIngredient.type].price
    })
    return totalPrice
  }
)

export const selectCurrentItemQuantity = createSelector(
  selectCurrentItemState,
  (state): number => state.quantity
)

export const selectCurrentItemSubtotal = createSelector(
  selectCurrentItemPrice,
  selectCurrentItemQuantity,
  (price, quantity): number => price * quantity
)


// ------- ORIGIN INFO: SPECIALTY -------
export const selectSelectedSpecialtyId = createSelector(
  selectCurrentItemState,
  (state): string => state.selectedSpecialtyId
)

export const selectSelectedSpecialty = createSelector(
  selectSelectedSpecialtyId,
  selectSpecialties,
  (id, specialties): Specialty => specialties.find(specialty =>
    specialty.id === id)
)

export const selectSpecialtyIngredientIds = createSelector(
  selectSelectedSpecialty,
  (specialty): Ingredients => specialty.ingredients
)

export const selectSpecialtyIngredients = createSelector(
  selectSpecialtyIngredientIds,
  selectAllIngredients,
  (specialtyIds, allIngredients): IngredientList => allIngredients.filter(ingredient => specialtyIds.includes(ingredient.id))
)

export const selectSpecialtyModified = createSelector(
  selectCurrentItemIngredientIds,
  selectSpecialtyIngredientIds,
  (current, specialty): boolean => {
    // check: same # of ingredients
    if (current.length != specialty.length) {
      return true // yes, modified
    } else {
      // check: all item ingredients included in specialty list
      current.forEach(ingredientId =>
        !specialty.includes(ingredientId) ? true : false
      )
    }
    return false // no, not modified
  }
)
