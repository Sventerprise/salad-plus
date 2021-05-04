import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadSpecialtyIngredients, setItemIngredientsFromSpecialty, updateSpecialty } from 'src/app/stores/actions/current-item.actions';
import { selectSpecialtiesOfGroup } from 'src/app/stores/selectors/current-item.selectors';
import { selectAllIngredients, selectIngredientTypes } from 'src/app/stores/selectors/order-static-data.selectors';
import { IngredientList, IngredientTypes } from '../models/Ingredient';

import { Specialties, Specialty } from '../models/Specialty';
import { CurrentItemService } from '../services/currentItems.services';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.scss']
})
export class SpecialtyComponent implements OnInit {
  specialties$: Observable<Specialties>
  myArray: Specialty[] = []

  constructor(
    public store: Store<Specialties>,
    public service: CurrentItemService
  ) {
    this.specialties$ = this.store.select(selectSpecialtiesOfGroup)

  }

  ngOnInit(): void {
  }
  // before exiting use the selected ID to load the
  // specialty into the store

  // find specialty
  public loadSpecialty(selectedSpecialtyId: string): void {
    let selectedSpecialty: Specialty = this.service
      .getSelectedSpecialty(selectedSpecialtyId)
    // load specialty to store
    this.store.dispatch(updateSpecialty({ selectedSpecialty }))
    //get specialty ingredient objects
    let specialtyIngredients: IngredientList = this.service
      .getSpecialtyIngredientsList(selectedSpecialty.ingredients)
    // load to store for use by builder
    this.store.dispatch(loadSpecialtyIngredients({ specialtyIngredients }))

    // set specialty ingredients to item ingredients (in case they change)
    this.store.dispatch(setItemIngredientsFromSpecialty(
      { initialIngredients: specialtyIngredients }
    ))
  }

  public calculateSpecialtyPrice(specialty: Specialty): string {
    let totalPrice: number = 0
    let price: string
    let allIngredients: IngredientList
    let ingredientTypes: IngredientTypes

    // get all ingredients & their type info
    this.store.select(selectAllIngredients).subscribe(ingredients =>
      allIngredients = ingredients
    )
    this.store.select(selectIngredientTypes).subscribe(types =>
      ingredientTypes = types
    )

    // look up each specialty ingredient to get type
    specialty.ingredients.forEach(sIngredientId => {
      let currentIngredient = allIngredients.find(ingredient =>
        sIngredientId === ingredient.id
      )
      // return the price and add to the running total
      totalPrice += +ingredientTypes[currentIngredient.type].price
    });
    price = totalPrice.toFixed(2)
    return price
  }

}
