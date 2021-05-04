import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateHeader } from '../../shared/state/shared.actions';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  confirmFlag: boolean = false
  popupFlag: boolean = false

  constructor(
    private store: Store<{}>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(updateHeader({ header: 'Review and/or Order More' }))
  }

  public openCancelConfirm() {
    this.popupFlag = true
    this.confirmFlag = true
  }

  public confirmCancel() {
  }

  public closePopup() {
    this.popupFlag = false
    this.confirmFlag = false
  }
}
