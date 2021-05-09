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
import { commitChanges, updateIngredients } from 'src/app/modules/order/state/current-item/current-item.actions';
import { updateHeader } from '../../shared/state/shared.actions';
import { CartService } from 'src/app/services/cart.service';
import { OrderItem, OrderItems } from '../models/Item';
import { addOrderItem } from '../state/order-items/order-items.actions';
import { selectCurrentItemIngredientIds, selectCurrentItemPrice, selectCurrentItemQuantity, selectCurrentItemState, selectCurrentItemSubtotal, selectCurrentItemGroup } from '../state/current-item/current-item.selectors';
import { ItemGroup } from '../models/ItemGroup';
import { State } from '../state/current-item/current-item.reducer';

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
  currentItem: OrderItem

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
    this.store.select(selectCurrentItemState).subscribe(item =>
      this.currentItem = item)
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
    // either add new item or add modified item
    // if itemId == null, add new item
    // replace itemId & name
    // addNewCartItem()

    // if itemId != null, add existing item
    // insert item to Cart


    // build item... probably delete (done in reducer)
    let currentIngredients: string[]
    let group: ItemGroup
    let price, quantity, subtotal: number
    this.store.select(selectCurrentItemIngredientIds).subscribe(ids =>
      currentIngredients = ids
    )
    this.store.select(selectCurrentItemGroup).subscribe(thisGroup =>
      group = thisGroup
    )
    this.store.select(selectCurrentItemPrice).subscribe(thisPrice =>
      price = thisPrice
    ),
      this.store.select(selectCurrentItemQuantity).subscribe(thisQuantity =>
        quantity = thisQuantity
      )
    this.store.select(selectCurrentItemSubtotal).subscribe(thisSubtotal =>
      subtotal = thisSubtotal
    )

    let orderItem: OrderItem
    orderItem = Object.assign({},
      {
        id: this.cartService.generateId(),
        name: this.cartService.generateName(),
        ingredients: currentIngredients,
        itemGroup: group,
        price: price,
        quantity: quantity,
        subtotal: subtotal
      }
    )

    this.store.dispatch(addOrderItem({ orderItem }))
  }
  //#region Popups

  //#region Select Ingredient
  public selectIngredient(selectedIngredientId: string) {
    let ingredients: string[]
    this.store.select(selectCurrentItemIngredientIds).subscribe(currentIngredientIds => {
      if (currentIngredientIds.includes(selectedIngredientId)) {
        ingredients = currentIngredientIds.filter(id =>
          id != selectedIngredientId)
      } else {
        ingredients = Object.assign([], currentIngredientIds)
        ingredients.push(selectedIngredientId)
      }
    })

    this.store.dispatch(updateIngredients({ ingredients }))




    // let ingredients: IngredientList
    // // update ingredient type for commit list filter
    // this.store.dispatch(fromItemEditActions.updateEditIngredientType(
    //   { ingredientType: ingredient.type }
    // ))

    // if (this.isSelected(ingredient.id)) {
    //   // remove the item from selected list
    //   ingredients = this.service.removeSelectedIngredient(ingredient)
    //   this.store.dispatch(fromItemEditActions.removeSelectedIngredient(
    //     { ingredients }
    //   ))
    // } else {
    //   // if selectType "multiple" 1+ can be selected
    //   if (this.service.ingredientMultiSelectType(ingredient.type) === 'multiple') {
    //     //  add the new ingredient
    //     ingredients = this.service.addSelectedIngredient(ingredient)
    //     this.store.dispatch(fromItemEditActions.addSelectedIngredient(
    //       { ingredients }
    //     ))
    //   } else {
    //     //  remove all
    //     this.store.dispatch(fromItemEditActions.clearSelectedIngredients())
    //     // add the new ingredient
    //     ingredients = this.service.addSelectedIngredient(ingredient)
    //     this.store.dispatch(fromItemEditActions.addSelectedIngredient(
    //       { ingredients }
    //     ))
    //   }
    // }
  }

  public closeSelectIngredient() {
    // this.commitSelections()
    this.store.dispatch(closeIngredientSelectorPopup())
  }

  private commitSelections() {
    let ingredients: IngredientList = this.service.commitIngredientChanges()
    let orderItem: State
    this.store.select(selectCurrentItemState).subscribe(item =>
      orderItem = item)
    this.store.dispatch(commitChanges({ orderItem }))



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
