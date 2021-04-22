import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSpecialtyIngredients, selectSelectedSpecialty, selectBreads } from 'src/app/stores/selectors/current-item.selectors';
import { selectAllIngredients, selectIngredientTypes } from 'src/app/stores/selectors/order-static-data.selectors';
import { Ingredient, IngredientList, IngredientType, IngredientTypes } from '../models/Ingredient';
import { Specialty } from '../models/Specialty';
import * as fromCurrentItem from 'src/app/stores/selectors/current-item.selectors'
import { ItemGroup } from '../models/ItemGroup';

@Component({
  selector: 'app-builder-form',
  templateUrl: './builder-form.component.html',
  styleUrls: ['./builder-form.component.scss']
})
export class BuilderFormComponent implements OnInit {
  //#region Declarations
  specialtyIngredients$: Observable<IngredientList>
  allIngredients$: Observable<IngredientList>
  specialty$: Observable<Specialty>
  allIngredients: Ingredient[]
  ingredientTypes$: Observable<IngredientType>
  selectedItemGroup$: Observable<string>

  breads: Observable<Ingredient[]>
  greens: Observable<Ingredient[]>
  meats: Observable<Ingredient[]>
  veggies: Observable<Ingredient[]>
  condiments: Observable<Ingredient[]>
  cheeses: Observable<Ingredient[]>
  nutsFruits: Observable<Ingredient[]>

  iType: IngredientType
  //#endregion declarations


  constructor(
    // private fb: FormBuilder
    private store: Store<{}>,
  ) { }

  ngOnInit(): void {
    this.specialty$ = this.store.select(selectSelectedSpecialty)
    this.specialtyIngredients$ = this.store.select(selectSpecialtyIngredients)
    this.allIngredients$ = this.store.select(selectAllIngredients)
    this.ingredientTypes$ = this.store.select(selectIngredientTypes)
    this.ingredientTypes$.subscribe(x => {
      this.iType = x
    })
    this.selectedItemGroup$ = this.store.select(fromCurrentItem.selectSelectedItemGroup)

    //#region select ingredient groups
    this.breads = this.store.select(fromCurrentItem.selectBreads)
    this.breads.subscribe(
    )
    this.greens = this.store.select(fromCurrentItem.selectGreens)
    this.breads.subscribe(
    )
    this.meats = this.store.select(fromCurrentItem.selectMeats)
    this.breads.subscribe(
    )
    this.cheeses = this.store.select(fromCurrentItem.selectCheeses)
    this.breads.subscribe(
    )
    this.veggies = this.store.select(fromCurrentItem.selectVeggies)
    this.breads.subscribe(
    )
    this.nutsFruits = this.store.select(fromCurrentItem.selectNutsFruit)
    this.breads.subscribe(
    )
    this.condiments = this.store.select(fromCurrentItem.selectCondiments)
    this.breads.subscribe(
    )
    //#endregion ingredient groups
  }

  onSubmit() {

  }

}
