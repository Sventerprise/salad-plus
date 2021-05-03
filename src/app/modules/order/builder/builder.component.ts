import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { closeIngredientSelectorPopup } from 'src/app/stores/actions/item-edit.actions';
import { selectAllIngredientsOfType, selectSelectorFlag } from 'src/app/stores/selectors/item-edit.selectors';
import { Ingredient, IngredientList } from '../models/Ingredient';
import * as fromItemEdit from 'src/app/stores/selectors/item-edit.selectors'

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
    private store: Store<{}>
  ) { }

  ngOnInit(): void {
    this.ingredientsOfType = this.store.select(selectAllIngredientsOfType)
    this.selectorFlag = this.store.select(selectSelectorFlag)
    this.store.select(fromItemEdit.selectAllIngredientsOfType)
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

  public selectIngredient(ingredient: string) {
    this.closePopup()
  }

  public closePopup() {
    this.popupFlag = false
    this.confirmFlag = false
    this.categoryFlag = false
  }
  //#endregion popups
  //#endregion methods

}
