import { Component, OnInit } from '@angular/core';
import { Specialties } from '../models/Specialty';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.scss']
})
export class SpecialtyComponent implements OnInit {
  specialties!: Specialties

  constructor() {
    this.specialties = [
      {
        "id": "ham_sourdough",
        "name": "Ham on Sourdough",
        "ingredients": ["ham", "sourdough", "cheddar"],
        "itemGroup": "sandwich",
        "img": "./assets/images/specialties/ham_sourdough.png",
        "description": "This is some sample text describing a sandwich. You should think about this sandwich when you're hungry. But if you have no way of getting this sandwich, maybe don't."
      },
      {
        "id": "turkey_sandwich",
        "name": "Turkey on White",
        "ingredients": [
          "ham",
          "kaiser_roll",
          "provolone",
          "mustard",
          "green_lettuce"
        ],
        "itemGroup": "sandwich",
        "img": "./assets/images/specialties/ham_sourdough.png",
        "description": "This is some sample text describing a sandwich. You should think about this sandwich when you're hungry. But if you have no way of getting this sandwich, maybe don't."
      },
      {
        "id": "cobb",
        "name": "Cobb Salad",
        "ingredients": [
          "ham",
          "turkey",
          "mixed_greens",
          "tomato",
          "cheddar",
          "cucumber",
          "ranch"
        ],
        "itemGroup": "salad",
        "img": "./assets/images/specialties/ham_sourdough.png",
        "description": "This is some sample text describing a sandwich. You should think about this sandwich when you're hungry. But if you have no way of getting this sandwich, maybe don't."
      },
      {
        "id": "svens_salad",
        "name": "Sven's Salad",
        "ingredients": [
          "red_lettuce",
          "vinaigrette",
          "almonds",
          "cranberries",
          "ham"
        ],
        "itemGroup": "salad",
        "img": "./assets/images/specialties/ham_sourdough.png",
        "description": "This is some sample text describing a sandwich. You should think about this sandwich when you're hungry. But if you have no way of getting this sandwich, maybe don't."
      }
    ]
  }

  ngOnInit(): void {
  }

  public loadSpecialty(id: string): void {

  }

}
