import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  updateIngredients,
  updateSpecialtyId
} from 'src/app/modules/order/state/current-item/current-item.actions'
import { selectSpecialtiesOfGroup, selectSpecialtyIngredientIds, selectSpecialtyIngredients } from 'src/app/modules/order/state/current-item/current-item.selectors';
import { selectAllIngredients, selectIngredientTypes } from 'src/app/stores/selectors/order-static-data.selectors';
import { updateHeader } from '../../shared/state/shared.actions';
import { IngredientList, Ingredients, IngredientTypes } from '../models/Ingredient';

import { Specialties, Specialty } from '../models/Specialty';
import { CurrentItemService } from '../services/currentItems.service';

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
    this.store.dispatch(updateHeader({ header: 'Specialty Selector' }))
  }
  // before exiting use the selected ID to load the
  // specialty as the current item

  // find specialty
  public loadSpecialty(selectedSpecialtyId: string): void {
    let specialtyIngredients: Ingredients

    this.store.dispatch(updateSpecialtyId({ selectedSpecialtyId }))
    this.store.select(selectSpecialtyIngredientIds).subscribe(ingredients =>
      specialtyIngredients = ingredients
    )
    // load specialty ingredients to current item
    this.store.dispatch(updateIngredients({ ingredients: specialtyIngredients }))
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
