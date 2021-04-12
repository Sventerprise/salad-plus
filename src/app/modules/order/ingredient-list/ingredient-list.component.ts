import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss']
})
export class IngredientListComponent implements OnInit {
  ingredientTypes: string[] = ["Bread", "Meat", "Cheese", "Veggies", "Condiments"]
  ingredients = [
    { name: "Sourdough", type: "bread", price: 1.20 },
    { name: "Rye", type: "bread", price: 1.20 },
    { name: "Wheat", type: "bread", price: 1.20 }
  ]
  typeSelect: boolean = true

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  typeSelected(type: string) {

    this.typeSelect = false
  }

  ingredientSelected(ingredient: string) {
    this.router.navigate(['/order/builder'
      , { selected: ingredient }
    ])
  }

}
