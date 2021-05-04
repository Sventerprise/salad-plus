import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectHeaderMessage, selectSharedState } from '../state/shared.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headerMessage$: Observable<string>

  constructor(private store: Store<{}>) { }

  ngOnInit(): void {
    this.headerMessage$ = this.store.select(selectHeaderMessage)
  }

}
