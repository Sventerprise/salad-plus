import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { closeIngredientSelectorPopup } from 'src/app/stores/actions/item-edit.actions';
import { selectAllIngredientsOfType, selectSelectorFlag } from 'src/app/stores/selectors/item-edit.selectors';
import { Ingredient, IngredientList } from '../models/Ingredient';
import * as fromItemEdit from 'src/app/stores/selectors/item-edit.selectors'
import * as fromItemEditActions from 'src/app/stores/actions/item-edit.actions'
import { CurrentItemService } from '../services/currentItems.services';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  categoryFlag: boolean = false
  selectorFlag: Observable<boolean>
  confirmFlag: boolean = false
  popupFlag: boolean = false

  ingredientsOfType: Observable<Ingredient[]>
  selectedIngredients: IngredientList
  typeSelect: boolean = true

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<{}>,
    private service: CurrentItemService
  ) { }

  ngOnInit(): void {
    this.ingredientsOfType = this.store.select(selectAllIngredientsOfType)
    this.selectorFlag = this.store.select(selectSelectorFlag)
    this.store.select(fromItemEdit.selectSelectedIngredientsOfType)
      .subscribe(ingredients => this.selectedIngredients = ingredients)
  }

  // #region Methods
  public openIngredientTypes() {
    this.popupFlag = true
    this.categoryFlag = true
  }

  public closeSelectIngredient() {
    this.store.dispatch(closeIngredientSelectorPopup())
  }

  public isSelected(id: string): boolean {
    return this.selectedIngredients.find(ingredients =>
      ingredients.id === id) ? true : false
  }

  //#region Popups
  public openCancelConfirm() {
    this.popupFlag = true
    this.confirmFlag = true
  }

  public confirmCancel() {
  }

  public selectIngredient(ingredient: Ingredient) {
    if (this.isSelected(ingredient.id)) {
      // remove the item from selected list
      this.store.dispatch(fromItemEditActions.removeSelectedIngredient({ ingredient }))

      //   else
      // if multiselect type is multi, add
      if (this.service.ingredientMultiSelectType(ingredient.id) === 'multi') {
        this.store.dispatch(fromItemEditActions.addSelectedIngredient(
          { ingredient }
        ))
      } else { // remove all, then add
        this.store.dispatch(fromItemEditActions.clearSelectedIngredients())
        this.store.dispatch(fromItemEditActions.addSelectedIngredient(
          { ingredient }
        ))
      }
    }
  }

  public closePopup() {
    this.popupFlag = false
    this.confirmFlag = false
    this.categoryFlag = false
  }
  //#endregion popups
  //#endregion methods

}
