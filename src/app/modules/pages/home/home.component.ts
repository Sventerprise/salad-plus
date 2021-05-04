import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateHeader } from '../../shared/state/shared.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store<{}>) { }

  ngOnInit(): void {
    this.store.dispatch(updateHeader({ header: 'Salad, Sandwich, & Sven!' }))
  }

}
