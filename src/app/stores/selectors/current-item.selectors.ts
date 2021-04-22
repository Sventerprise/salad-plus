import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IngredientList } from 'src/app/modules/order/models/Ingredient';
import { Specialties, Specialty } from 'src/app/modules/order/models/Specialty';
import * as fromCurrentItem from '../reducers/current-item.reducer';
import { selectAllIngredients, selectSpecialties } from './order-static-data.selectors';

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

export const selectSelectedSpecialty = createSelector(
  selectCurrentItemState,
  (state) => state.selectedSpecialty
)

export const selectSpecialtyIngredients = createSelector(
  selectSelectedSpecialty,
  selectAllIngredients,
  (specialty: Specialty, allIngredients: IngredientList): IngredientList => {
    let list: IngredientList = []
    specialty.ingredients.forEach(specialtyIngredients => {
      allIngredients.forEach(ingredient => {
        if (ingredient.id === specialtyIngredients) { list.push(ingredient) }
      })
    })
    return list
  }
)
//#region Individual Ingredients
export const selectBreads = createSelector(
  selectAllIngredients,
  (allIngredients): IngredientList => allIngredients.filter(
    ingredient => ingredient.type == "Bread"
  )
)

export const selectGreens = createSelector(
  selectAllIngredients,
  (allIngredients): IngredientList => allIngredients.filter(
    ingredient => ingredient.type == "Greens"
  )
)

export const selectMeats = createSelector(
  selectAllIngredients,
  (allIngredients): IngredientList => allIngredients.filter(
    ingredient => ingredient.type == "Meat"
  )
)

export const selectCheeses = createSelector(
  selectAllIngredients,
  (allIngredients): IngredientList => allIngredients.filter(
    ingredient => ingredient.type == "Cheese"
  )
)

export const selectVeggies = createSelector(
  selectAllIngredients,
  (allIngredients): IngredientList => allIngredients.filter(
    ingredient => ingredient.type == "Veggies"
  )
)

export const selectNutsFruit = createSelector(
  selectAllIngredients,
  (allIngredients): IngredientList => allIngredients.filter(
    ingredient => ingredient.type == "Nuts/Fruit"
  )
)

export const selectCondiments = createSelector(
  selectAllIngredients,
  (allIngredients): IngredientList => allIngredients.filter(
    ingredient => ingredient.type == "Condiments"
  )
)
//#region individual ingredients
