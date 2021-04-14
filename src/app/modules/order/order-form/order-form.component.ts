import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  recipes = {
    recipe_1: [
      { id: "ham_xtr", name: "Extra Ham", price: 4.40, category: "meat" },
      { id: "bread_sourdough", name: "Sourdough", price: 1.30, category: "bread" },
      { id: "cheddar", name: "Cheddar", price: 1.10, category: "cheese" }
    ],
    recipe_2: [
      { id: "ham", name: "Ham", price: 2.20, category: "meat" },
      { id: "bread_sourdough", name: "Sourdough", price: 1.30, category: "bread" },
      { id: "cheddar", name: "Cheddar", price: 1.10, category: "cheese" },
      { id: "pickles", name: "Pickles", price: 1.10, category: "veggie" }
    ]
  }

  items = [
    { name: "Custom Sandwich 1", price: 200.99, quantity: 1, subtotal: 6.40, recipe: this.recipes.recipe_1 },
    { name: "Custom Sandwich 2", price: 4.20, quantity: 2, subtotal: 8.40, recipe: this.recipes.recipe_2 }
  ]

  order = {
    id: "abc",
    total: 6.80,
    items: this.items
  }

  view1: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  viewDetail() {
    // TODO set store item view to True
    this.view1 = true
  }

  hideDetail() {
    // TODO set store item view to True
    this.view1 = false
  }

}
