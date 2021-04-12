import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-builder-form',
  templateUrl: './builder-form.component.html',
  styleUrls: ['./builder-form.component.scss']
})
export class BuilderFormComponent implements OnInit {
  // builderForm: FormGroup = new FormGroup;
  ingredients = [
    { id: "ham", name: "Ham", price: 2.20, img: ".assets/images/cheddar_cheese.png" },
    { id: "ched", name: "Cheddar Cheese", price: 1.20, img: ".assets/images/cheddar_cheese.png" },
    { id: "br_sd", name: "Sourdough", price: 1.60, img: ".assets/images/sourdough.png" },
  ]

  constructor(
    // private fb: FormBuilder
  ) { }

  ngOnInit(): void {

  }

  onSubmit() {

  }

}
