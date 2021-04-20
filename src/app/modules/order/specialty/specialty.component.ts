import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectItemGroup } from 'src/app/stores/selectors/current-item.selectors';

import { Specialties, Specialty } from '../models/Specialty';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.scss']
})
export class SpecialtyComponent implements OnInit {
  specialties$: Observable<Specialties>
  itemGroup: string | undefined
  myArray: Specialty[] = []

  constructor(
    public store: Store<Specialties>
  ) {
    this.specialties$ = this.store.select(selectItemGroup)

  }

  ngOnInit(): void {
  }

  public loadSpecialty(id: string): void {
  }

}
