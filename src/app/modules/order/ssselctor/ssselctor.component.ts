import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clearCurrentItem, setItemGroup } from 'src/app/stores/actions/current-item.actions';
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
  }

  public setItemGroup(selectedItemGroup: ItemGroup) {
    this.store.dispatch(setItemGroup({ selectedItemGroup }))
  }

  public clearCurrentSpecialty() {
    this.store.dispatch(clearCurrentItem())
  }

}
