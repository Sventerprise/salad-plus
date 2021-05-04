import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateHeader } from '../../shared/state/shared.actions';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  confirmFlag: boolean = false
  popupFlag: boolean = false

  constructor(
    private store: Store<{}>) { }

  ngOnInit(): void {
    this.store.dispatch(updateHeader({ header: 'Payment' }))
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
