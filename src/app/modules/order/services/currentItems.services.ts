import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { find } from "rxjs/operators";
import { selectAllIngredientsOfType, selectSelectedIngredientsOfType } from "src/app/stores/selectors/item-edit.selectors";
import { selectAllIngredients, selectOrderStaticDataState, selectSpecialties } from "src/app/stores/selectors/order-static-data.selectors";
import { Ingredient, IngredientList, Ingredients } from "../models/Ingredient";
import { Specialties, Specialty } from "../models/Specialty";

@Injectable({
  providedIn: 'root'
})

export class CurrentItemService {
  specialties$: Observable<Specialties>

  constructor(
    private store: Store<any>,
  ) { }

  public getSelectedSpecialty(specialtyId: string) {
    let currentSpecialty: Specialty | null = null
    this.specialties$ = this.store.select(selectSpecialties)
    this.specialties$.subscribe(specialties => {
      specialties.forEach(specialty => {
        if (specialty.id === specialtyId) {
          currentSpecialty = specialty
        }
      })
    })
    return currentSpecialty == undefined ? null : currentSpecialty
  }

  public getSpecialtyIngredientsList(specialtyIngredients: Ingredients): IngredientList | null {
    let list: IngredientList = []
    this.store.select(selectAllIngredients).subscribe(allIngredients =>
      list = allIngredients.filter(ingredient => specialtyIngredients.find(sIngredient => ingredient.id === sIngredient)
      )
    )
    return list
  }

  public ingredientMultiSelectType(id: string): string {
    let selectType: string
    this.store.select(selectOrderStaticDataState).subscribe(state =>
      selectType = state.ingredientTypes[id].selectType)
    return selectType
  }

  public addSelectedIngredient(ingredient: Ingredient): IngredientList {
    let ingredientList: IngredientList
    this.store.select(selectSelectedIngredientsOfType)
      .subscribe(ingredients =>
        ingredientList = ingredients
      )
    let newList: IngredientList = Object.assign([], ingredientList)
    newList.push(ingredient)
    return newList
  }

  public removeSelectedIngredient(ingredient: Ingredient): IngredientList {
    let ingredientList: IngredientList
    this.store.select(selectSelectedIngredientsOfType)
      .subscribe(ingredients =>
        ingredientList = ingredients.filter(sIngredient =>
          sIngredient.id != ingredient.id)
      )
    return ingredientList
  }
}
