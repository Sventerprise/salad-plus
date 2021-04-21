import { createFeatureSelector, createSelector } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { IngredientList, Ingredients } from 'src/app/modules/order/models/Ingredient';
import { ItemGroup } from 'src/app/modules/order/models/ItemGroup';
import { Specialties, Specialty } from 'src/app/modules/order/models/Specialty';
import * as fromCurrentItem from '../reducers/current-item.reducer';
import { selectIngredients, selectSpecialties } from './order-static-data.selectors';

export const selectCurrentItemState = createFeatureSelector<fromCurrentItem.State>(
  fromCurrentItem.currentItemFeatureKey
);

export const selectSelectedItemGroup = createSelector(
  selectCurrentItemState,
  (state) => state.selectedItemGroup
)

// returns a list of specialties with the matching group
// ex: return all sandwiches
export const selectItemGroup = createSelector(
  selectSpecialties,
  selectSelectedItemGroup,
  (specialties: Specialty[], selectedGroup: string) =>
    specialties.filter(specialty =>
      specialty.itemGroup === selectedGroup)
)

export const selectSelectedSpecialty = createSelector(
  selectCurrentItemState,
  (state) => state.selectedSpecialty
)

export const selectSpecialtyIngredients = createSelector(
  selectSelectedSpecialty,
  selectIngredients,
  (specialty: Specialty, allIngredients: IngredientList): IngredientList => {

    let list: IngredientList = []
    specialty.ingredients.forEach(ingKey => {
      allIngredients.forEach(ingObj => {
        if (ingObj.id === ingKey) { list.push(ingObj) }
      })
    })


    return list
  }


  // allIngredients.filter(ingredient => ingredient.forEach(specialty => {

  // } === ingredient.id)
)
