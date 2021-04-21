import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSpecialtyIngredients, selectSelectedSpecialty } from 'src/app/stores/selectors/current-item.selectors';
import { selectIngredients } from 'src/app/stores/selectors/order-static-data.selectors';
import { IngredientList } from '../models/Ingredient';
import { CurrentItemService } from '../services/currentItems.services';

@Component({
  selector: 'app-builder-form',
  templateUrl: './builder-form.component.html',
  styleUrls: ['./builder-form.component.scss']
})
export class BuilderFormComponent implements OnInit {
  // builderForm: FormGroup = new FormGroup;

  ingredients$: Observable<IngredientList>
  allIngredients$: Observable<IngredientList>

  constructor(
    // private fb: FormBuilder
    private store: Store<{}>,
    private service: CurrentItemService,
  ) { }

  ngOnInit(): void {
    this.store.select(selectSelectedSpecialty)
    this.store.select(selectIngredients)
      .subscribe(x =>
        console.log(x)
      )
    this.ingredients$ = this.store.select(selectSpecialtyIngredients)

  }

  onSubmit() {

  }

}
