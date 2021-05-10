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

  public ingredientMultiSelectType(id: string): string {
    let selectType: string
    this.store.select(selectOrderStaticDataState).subscribe(state =>
      selectType = state.ingredientTypes[id].selectType)
    return selectType
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
