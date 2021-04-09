import { Component, OnInit } from '@angular/core';
import { Recipes } from '../models/Recipe';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.scss']
})
export class SpecialtyComponent implements OnInit {
  recipes!: Recipes

  constructor() {
    this.recipes = [
      {
        "id": "ham_sourdough",
        "name": "Ham on Sourdough",
        "description": "I'm a ham sandwich! I have ham and cheese on me!",
        "img": "./assets/images/recipes/ham_sandwich.jpg",
        "type": "sandwich"
      },
      {
        "id": "meat_thing",
        "name": "Meat Thing",
        "description": "I'm a ham sandwich! I have ham and cheese on me!",
        "img": "./assets/images/recipes/ham_sandwich.jpg",
        "type": "sandwich"
      },
      {
        "id": "ham_sourdough",
        "name": "Veggie Thing",
        "description": "I'm a ham sandwich! I have ham and cheese on me!",
        "img": "./assets/images/recipes/ham_sandwich.jpg",
        "type": "sandwich"
      },
      {
        "id": "ham_sourdough",
        "name": "Turtle Thing",
        "description": "I'm a ham sandwich! I have ham and cheese on me!",
        "img": "./assets/images/recipes/ham_sandwich.jpg",
        "type": "sandwich"
      },
    ]
  }

  ngOnInit(): void {
  }

  public loadSpecialty(id: string): void {

  }

}
