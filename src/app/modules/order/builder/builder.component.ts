import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { closeIngredientSelectorPopup } from 'src/app/modules/order/state/item-edit/item-edit.actions';
import { selectAllIngredientsOfType, selectSelectorFlag } from 'src/app/modules/order/state/item-edit/item-edit.selectors';
import { Ingredient, IngredientList } from '../models/Ingredient';
import * as fromItemEdit from 'src/app/modules/order/state/item-edit/item-edit.selectors'
import * as fromItemEditActions from 'src/app/modules/order/state/item-edit/item-edit.actions'
import { CurrentItemService } from '../services/currentItems.services';
import { commitChanges } from 'src/app/modules/order/state/current-item/current-item.actions';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  categoryFlag: boolean = false
  selectorFlag: Observable<boolean>
  confirmFlag: boolean = false

  ingredientsOfType: Observable<Ingredient[]>
  selectedIngredients: IngredientList
  typeSelect: boolean = true

  // debug
  counter: number = 0

  constructor(
    private store: Store<{}>,
    private service: CurrentItemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ingredientsOfType = this.store.select(selectAllIngredientsOfType)
    this.selectorFlag = this.store.select(selectSelectorFlag)
    this.store.dispatch(closeIngredientSelectorPopup())
    this.store.select(fromItemEdit.selectSelectedIngredientsOfType)
      .subscribe(ingredients => this.selectedIngredients = ingredients)
  }

  // #region Methods

  public isSelected(id: string): boolean {
    // this.counter += 1
    // console.log("I've run " + this.counter + " times.")
    if (this.selectedIngredients) {
      return this.selectedIngredients.find(ingredient =>
        ingredient.id === id) ? true : false
    } else
      return false
  }

  //#region Popups

  //#region Select Ingredient
  public selectIngredient(ingredient: Ingredient) {
    let ingredients: IngredientList
    // update ingredient type for commit list filter
    this.store.dispatch(fromItemEditActions.updateEditIngredientType(
      { ingredientType: ingredient.type }
    ))

    if (this.isSelected(ingredient.id)) {
      // remove the item from selected list
      ingredients = this.service.removeSelectedIngredient(ingredient)
      this.store.dispatch(fromItemEditActions.removeSelectedIngredient(
        { ingredients }
      ))
    } else {
      // if selectType "multiple" 1+ can be selected
      if (this.service.ingredientMultiSelectType(ingredient.type) === 'multiple') {
        //  add the new ingredient
        ingredients = this.service.addSelectedIngredient(ingredient)
        this.store.dispatch(fromItemEditActions.addSelectedIngredient(
          { ingredients }
        ))
      } else {
        //  remove all
        this.store.dispatch(fromItemEditActions.clearSelectedIngredients())
        // add the new ingredient
        ingredients = this.service.addSelectedIngredient(ingredient)
        this.store.dispatch(fromItemEditActions.addSelectedIngredient(
          { ingredients }
        ))
      }
    }
  }

  public closeSelectIngredient() {
    this.commitSelections()
    this.store.dispatch(closeIngredientSelectorPopup())
  }

  private commitSelections() {
    let ingredients: IngredientList = this.service.commitIngredientChanges()
    this.store.dispatch(commitChanges({ ingredients }))
  }
  //#endregion Select Ingredient

  public openCancelConfirm() {
    this.confirmFlag = true
  }

  // //#region Confirm Cancel
  public confirmCancel() {
    this.confirmFlag = false
    // current item is cleared on /order onInit
    this.router.navigate(['/order'])
  }

  public closeConfirmCancel() {
    this.confirmFlag = false
  }
  // //#endregion Confirm Cancel
  //#endregion popups
  //#endregion methods

}
