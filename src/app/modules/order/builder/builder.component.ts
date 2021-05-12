import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { closeIngredientSelectorPopup } from 'src/app/modules/order/state/item-edit/item-edit.actions';
import { selectAllIngredientsOfType, selectSelectorFlag } from 'src/app/modules/order/state/item-edit/item-edit.selectors';
import { Ingredient, IngredientList, Ingredients } from '../models/Ingredient';
import * as fromItemEdit from 'src/app/modules/order/state/item-edit/item-edit.selectors'
import { updateCurrentItemId, updateCurrentItemName, updateCurrentItemPriceAndSubtotal, updateIngredients } from 'src/app/modules/order/state/current-item/current-item.actions';
import { updateHeader } from '../../shared/state/shared.actions';
import { CartService } from 'src/app/services/cart.service';
import { OrderItem } from '../models/Item';
import { selectCurrentItemId, selectCurrentItemIngredientIds, selectCurrentItemName, selectCurrentItemPrice, selectSelectedIngredientSelectType } from '../state/current-item/current-item.selectors';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  selectorFlag$: Observable<boolean>
  confirmFlag: boolean = false
  ingredientsOfType$: Observable<Ingredient[]>
  popupIngredientList: IngredientList
  currentItem: OrderItem

  constructor(
    private store: Store<{}>,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.dispatch(updateHeader({ header: 'Customize!' }))

    // ensure page starts with popup closed
    this.store.dispatch(closeIngredientSelectorPopup())
    this.selectorFlag$ = this.store.select(selectSelectorFlag)

    // returns the ingredients currently on the item of the chosen type
    // used to pre-select items on the ingredient selector popup:
    this.store.select(fromItemEdit.selectSelectedIngredientsOfType)
      .subscribe(ingredients => this.popupIngredientList = ingredients)
    this.ingredientsOfType$ = this.store.select(selectAllIngredientsOfType)

    // clear the id/name (if any)
    this.store.select(selectCurrentItemId).pipe(take(1)).subscribe(id =>
      this.store.dispatch(updateCurrentItemId({ id }))
    )
    this.store.select(selectCurrentItemName).pipe(take(1)).subscribe(name =>
      this.store.dispatch(updateCurrentItemName({ name }))
    )
    // update price
    this.store.select(selectCurrentItemPrice).pipe(take(1)).subscribe(price =>
      this.store.dispatch(updateCurrentItemPriceAndSubtotal({ price }))
    )

    // update the name/id
  }

  // #region Methods

  public isSelected(id: string): boolean {
    let ingredientIds: string[]
    this.store.select(selectCurrentItemIngredientIds).subscribe(
      currentIngredientIds => ingredientIds = currentIngredientIds
    )
    if (this.popupIngredientList) {
      return ingredientIds.find(ingredientId =>
        ingredientId === id) ? true : false
    } else
      return false
  }

  submit() {
    this.cartService.addOrderItem()
    this.cartService.updateTotal()
  }
  //#region Popups

  //#region Select Ingredient
  public selectIngredient(selectedIngredientId: string) {
    // (1) deselect if selected
    //else
    // (2.1) if single-select type, deselect any from the popup list from current selected
    // (2.2) select if not selected

    let ingredients: string[]
    // (1)
    this.store.select(selectCurrentItemIngredientIds).subscribe(currentIngredientIds => {
      if (currentIngredientIds.includes(selectedIngredientId)) {
        ingredients = currentIngredientIds.filter(id =>
          id != selectedIngredientId)
      } else {
        // (2.1)
        let selectType: string
        let popupIngredientIds: Ingredients

        this.store.select(selectSelectedIngredientSelectType).subscribe(type =>
          selectType = type
        )
        this.store.select(fromItemEdit.selectSelectedIngredientsOfTypeIds).subscribe(ids =>
          popupIngredientIds = ids
        )

        if (selectType === 'single') {
          // remove all popup ingredients from current item (clear list of type)
          currentIngredientIds = currentIngredientIds.filter(ingredientId =>
            !popupIngredientIds.includes(ingredientId)
          )
        }
        // (2.2)
        ingredients = Object.assign([], currentIngredientIds)
        ingredients.push(selectedIngredientId)
      }
    })

    this.store.dispatch(updateIngredients({ ingredients }))
  }

  public closeSelectIngredient() {
    this.store.dispatch(closeIngredientSelectorPopup())
    this.store.select(selectCurrentItemPrice).pipe(take(1)).subscribe(price =>
      this.store.dispatch(updateCurrentItemPriceAndSubtotal({ price }))
    )
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
