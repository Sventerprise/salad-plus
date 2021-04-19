import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSpecialties } from 'src/app/stores/selectors/order-static-data.selectors';
import { Specialties } from '../models/Specialty';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.scss']
})
export class SpecialtyComponent implements OnInit {
  specialties$: Observable<Specialties>

  constructor(
    public store: Store<Specialties>
  ) {
    this.specialties$ = this.store.select(selectSpecialties)

  }

  ngOnInit(): void {
  }

  public loadSpecialty(id: string): void {
  }

}
