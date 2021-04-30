import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { closeIngredientSelectorPopup } from 'src/app/stores/actions/current-item.actions';
import { selectCurrentItemState, selectIngredientSelect, selectSelectorFlag } from 'src/app/stores/selectors/current-item.selectors';
import { Ingredient } from '../models/Ingredient';

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

  ingredientSelect: Observable<Ingredient[]>
  typeSelect: boolean = true

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<{}>
  ) { }

  ngOnInit(): void {
    this.ingredientSelect = this.store.select(selectIngredientSelect)
    this.selectorFlag = this.store.select(selectSelectorFlag)
  }

  // #region Methods
  public openIngredientTypes() {
    this.popupFlag = true
    this.categoryFlag = true
  }

  public closeSelectIngredient() {
    this.store.dispatch(closeIngredientSelectorPopup())
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
