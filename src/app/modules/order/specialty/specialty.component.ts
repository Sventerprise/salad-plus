import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadSpecialtyIngredients, updateSpecialty } from 'src/app/stores/actions/current-item.actions';
import { selectSpecialtiesOfGroup } from 'src/app/stores/selectors/current-item.selectors';

import { Specialties, Specialty } from '../models/Specialty';
import { CurrentItemService } from '../services/currentItems.services';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.scss']
})
export class SpecialtyComponent implements OnInit {
  specialties$: Observable<Specialties>
  myArray: Specialty[] = []

  constructor(
    public store: Store<Specialties>,
    public service: CurrentItemService
  ) {
    this.specialties$ = this.store.select(selectSpecialtiesOfGroup)

  }

  ngOnInit(): void {
  }
  // before exiting use the selected ID to load the
  // specialty into the store

  // find specialty
  public loadSpecialty(selectedSpecialtyId: string): void {
    let selectedSpecialty = this.service
      .getSelectedSpecialty(selectedSpecialtyId)
    // load specialty to store
    this.store.dispatch(updateSpecialty({ selectedSpecialty }))
  }

}
