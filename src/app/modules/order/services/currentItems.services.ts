import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectSpecialties } from "src/app/stores/selectors/order-static-data.selectors";
import { IngredientList, Ingredients } from "../models/Ingredient";
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

  public getSpecialtyIngredientsList(specialtyId: string): Ingredients | null {
    let list: Ingredients | null = null
    this.specialties$ = this.store.select(selectSpecialties)
    this.specialties$.subscribe(specialties => {
      specialties.forEach(specialty => {
        if (specialty.id === specialtyId) {
          list = specialty.ingredients
        }
      })
    })
    console.log(list)
    return list == undefined ? null : list

  }
}
