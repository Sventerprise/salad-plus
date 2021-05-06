import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { closeIngredientSelectorPopup } from 'src/app/modules/order/state/item-edit/item-edit.actions';
import { selectAllIngredientsOfType, selectSelectorFlag } from 'src/app/modules/order/state/item-edit/item-edit.selectors';
import { Ingredient, IngredientList } from '../models/Ingredient';
import * as fromItemEdit from 'src/app/modules/order/state/item-edit/item-edit.selectors'
import * as fromItemEditActions from 'src/app/modules/order/state/item-edit/item-edit.actions'
import { CurrentItemService } from '../services/currentItems.service';
import { commitChanges } from 'src/app/modules/order/state/current-item/current-item.actions';
import { updateHeader } from '../../shared/state/shared.actions';
import { CartService } from 'src/app/services/cart.service';
import { OrderItem, OrderItems } from '../models/Item';
import { addItem, updateTotal } from '../state/cart/cart.actions';
import { selectOrderItems, } from '../state/cart/cart.selectors';

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
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.dispatch(updateHeader({ header: 'Customize!' }))

    // ensure page starts with popup closed
    this.store.dispatch(closeIngredientSelectorPopup())
    this.selectorFlag = this.store.select(selectSelectorFlag)
    // returns the ingredients currently on the item of the chosen type
    // used to pre-select items on the ingredient selector popup:
    this.store.select(fromItemEdit.selectSelectedIngredientsOfType)
      .subscribe(ingredients => this.selectedIngredients = ingredients)
    this.ingredientsOfType = this.store.select(selectAllIngredientsOfType)
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

  submit() {
    let newItem: OrderItem
    let orderItems: OrderItems = []
    let total: number

    // add the new order item
    newItem = this.cartService.buildOrderItem()
    orderItems.push(newItem)
    // add the current order items
    this.store.select(selectOrderItems).subscribe(items =>
      items.forEach(item =>
        orderItems = Object.assign(orderItems).push(item)
      )
    )
    console.log(orderItems)
    // update cart
    this.store.dispatch(addItem(
      { orderItems }
    ))
    this.cartService.updateTotal()

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
