import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSpecialtyIngredients, selectSelectedSpecialty } from 'src/app/stores/selectors/current-item.selectors';
import { selectAllIngredients, selectIngredientTypes } from 'src/app/stores/selectors/order-static-data.selectors';
import { Ingredient, IngredientList, IngredientType, IngredientTypes } from '../models/Ingredient';
import { Specialty } from '../models/Specialty';
import * as fromCurrentItem from 'src/app/stores/selectors/current-item.selectors'
import * as fromItemEdit from 'src/app/stores/actions/item-edit.actions'
import { CurrentItemService } from '../services/currentItems.services';


@Component({
  selector: 'app-builder-form',
  templateUrl: './builder-form.component.html',
  styleUrls: ['./builder-form.component.scss']
})
export class BuilderFormComponent implements OnInit {
  //#region Flags
  selectorFlag: boolean = false
  popupFlag: boolean = false
  //#endregion flags

  //#region Declarations
  currentItemIngredients$: Observable<IngredientList>
  specialty$: Observable<Specialty>
  allIngredients: Ingredient[]
  ingredientTypes$: Observable<IngredientType>
  selectedItemGroup$: Observable<string>
  iType: IngredientType

  //#region Ingredient Lists
  breads: IngredientList
  greens: IngredientList
  meats: IngredientList
  veggies: IngredientList
  condiments: IngredientList
  cheeses: IngredientList
  nutsFruits: IngredientList
  dressings: IngredientList
  //#endregion Ingredient Lists

  //#endregion declarations

  ingredients = []


  constructor(
    private store: Store<{}>,
    private service: CurrentItemService
  ) { }

  ngOnInit(): void {
    this.currentItemIngredients$ = this.store.select(fromCurrentItem.selectCurrentItemIngredients)
    this.store.select(selectIngredientTypes).subscribe(x => {
      this.iType = x
    })
    this.selectedItemGroup$ = this.store.select(fromCurrentItem.selectSelectedItemGroup)

    //#region select ingredient groups
    this.breads = this.service.getIngredient('Bread')
    this.greens = this.service.getIngredient('Greens')
    this.meats = this.service.getIngredient('Meat')
    this.cheeses = this.service.getIngredient('Cheese')
    this.veggies = this.service.getIngredient('Veggies')
    this.nutsFruits = this.service.getIngredient('Nuts/Fruit')
    this.condiments = this.service.getIngredient('Condiments')
    this.dressings = this.service.getIngredient('Dressings')
    //#endregion ingredient groups
  }


  //#region POPUP METHODS
  public confirmCancel() {
    // when a user taps cancel
    // a popup asks if the user is sure (cancels current item)

  }

  public editIngredients(type: string) {
    // when a user taps either an ingredient or its header
    // a popup listing the ingredients of that type appears

    // create list of ingredients to show in popup (type selected)
    let allIngredientsOfType: IngredientList
    this.store.select(selectAllIngredients).subscribe(all =>
      allIngredientsOfType = all.filter(i => i.type === type)
    )
    // send to the store
    this.store.dispatch(fromItemEdit.updateAllIngredientsOfType(
      { allIngredientsOfType: allIngredientsOfType }
    ))

    // create a temporary list of currently selected ingredients where items can be added/removed without affecting current item
    let selectedIngredients: IngredientList
    this.store.select(fromCurrentItem.selectCurrentItemIngredients)
      .subscribe(ingredients =>
        selectedIngredients = ingredients.filter(i => i.type === type)
      )
    // send to the store
    this.store.dispatch(fromItemEdit.updateTempIngredientsOfType(
      { selectedIngredientsOfType: selectedIngredients }
    ))

    // update selector flag in builder to open selector popup
    this.store.dispatch(fromItemEdit.openIngredientSelectorPopup())

  }

  //#endregion popup methods

  onSubmit() {

  }


  inSelected(typeId: string): boolean {
    let result: boolean = false
    this.currentItemIngredients$.subscribe(ingredients => {
      ingredients.forEach(ingredient => {
        if (ingredient.id === typeId) {
          result = true
          return
        }
      })
    })
    return result
  }

}
