import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadStaticOrderData } from 'src/app/stores/actions/order-static-data.actions';
import { OrderStaticData } from './models/OrderStaticData';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor(
    public store: Store<OrderStaticData>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadStaticOrderData())
  }

}
