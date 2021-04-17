import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  categoryFlag: boolean = false
  selectorFlag: boolean = false
  confirmFlag: boolean = false
  popupFlag: boolean = false

  //ingredients list
  ingredientTypes: string[] = ["Bread", "Meat", "Cheese", "Veggies", "Condiments"]
  ingredients = [
    { name: "Sourdough", type: "Bread", price: 1.20 },
    { name: "Rye", type: "Bread", price: 1.20 },
    { name: "Wheat", type: "Bread", price: 1.20 }
  ]
  typeSelect: boolean = true

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  // #region Methods
  public openIngredientTypes() {
    this.popupFlag = true
    this.categoryFlag = true
    this.selectorFlag = false
  }

  public openSelectIngredient(type: string) {
    this.popupFlag = true
    this.categoryFlag = false
    this.selectorFlag = true
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
    this.selectorFlag = false
  }
  //#endregion popups
  //#endregion methods

}
