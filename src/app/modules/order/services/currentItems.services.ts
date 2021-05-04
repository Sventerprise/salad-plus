import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { find } from "rxjs/operators";
import { selectCurrentItemIngredients, selectCurrentItemState } from "src/app/modules/order/state/current-item/current-item.selectors";
import { selectAllIngredientsOfType, selectIngredientType, selectSelectedIngredientsOfType } from "src/app/modules/order/state/item-edit/item-edit.selectors";
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
    private router: Router
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

  public commitIngredientChanges(): IngredientList {
    let currentItems, selectedItems, newList: IngredientList
    let type: string
    // get type for filters
    this.store.select(selectIngredientType).subscribe(ingredientType =>
      type = ingredientType
    )
    // get selected ingredients
    this.store.select(selectSelectedIngredientsOfType).subscribe(ingredients =>
      selectedItems = ingredients
    )
    // get current ingredients
    this.store.select(selectCurrentItemIngredients).subscribe(ingredients =>
      currentItems = ingredients
    )
    // transfer current ingredients not of selected type to new list
    newList = currentItems.filter(ingredient =>
      ingredient.type != type
    )
    // add selected items (if any)
    selectedItems.forEach(ingredient =>
      newList.push(ingredient)
    )
    return newList
  }

  public getIngredient(type: string): IngredientList {
    let ingredients: IngredientList
    this.store.select(selectAllIngredients).subscribe(allIngredients =>
      ingredients = allIngredients.filter(ingredient =>
        ingredient.type === type
      )
    )
    return ingredients
  }

}
