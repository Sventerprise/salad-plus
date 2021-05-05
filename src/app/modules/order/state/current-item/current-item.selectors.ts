import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Specialties, Specialty } from 'src/app/modules/order/models/Specialty';
import * as fromCurrentItem from './current-item.reducer';
import { selectAllIngredients, selectIngredientTypes, selectSpecialties } from '../../../../stores/selectors/order-static-data.selectors';
import { IngredientList, Ingredients } from '../../models/Ingredient';
import { Item, OrderItem } from '../../models/Item';

export const selectCurrentItemState = createFeatureSelector<fromCurrentItem.State>(
  fromCurrentItem.currentItemFeatureKey
);

export const selectSelectedItemGroup = createSelector(
  selectCurrentItemState,
  (state) => state.selectedItemGroup
)

// returns a list of specialties with the matching group
// ex: return all sandwiches
export const selectSpecialtiesOfGroup = createSelector(
  selectSpecialties,
  selectSelectedItemGroup,
  (specialties: Specialty[], selectedGroup: string): Specialties =>
    specialties.filter(specialty =>
      specialty.itemGroup === selectedGroup)
)

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

export const selectCurrentItemIngredients = createSelector(
  selectCurrentItemState,
  (state): IngredientList => state.currentItemIngredients
)

export const selectCurrentItemIngredientIds = createSelector(
  selectCurrentItemIngredients,
  (state): Ingredients => state.map(ingredient => ingredient.id)
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

export const selectCurrentItem = createSelector(
  selectCurrentItemIngredientIds,
  selectCurrentItemPrice,
  selectSelectedItemGroup,
  (ingredients, price, group): Item => (
    {
      id: 'string',
      name: 'string',
      ingredients: ingredients,
      itemGroup: group,
      price: price
    }
  )

)

