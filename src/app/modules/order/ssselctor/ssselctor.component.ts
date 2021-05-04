import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clearCurrentItem, setItemGroup } from 'src/app/modules/order/state/current-item/current-item.actions';
import { updateHeader } from '../../shared/state/shared.actions';
import { ItemGroup } from '../models/ItemGroup';

@Component({
  selector: 'app-ssselctor',
  templateUrl: './ssselctor.component.html',
  styleUrls: ['./ssselctor.component.scss']
})
export class SsselctorComponent implements OnInit {

  constructor(
    private router: Router,
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    this.clearCurrentSpecialty()
    this.store.dispatch(updateHeader({ header: 'Specialty or BYO?' }))
  }

  public setItemGroup(selectedItemGroup: ItemGroup) {
    this.store.dispatch(setItemGroup({ selectedItemGroup }))
  }

  public clearCurrentSpecialty() {
    this.store.dispatch(clearCurrentItem())
  }

}
