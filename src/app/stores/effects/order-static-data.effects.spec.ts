import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { OrderStaticDataEffects } from './order-static-data.effects';

describe('StaticOrderDataEffects', () => {
  let actions$: Observable<any>;
  let effects: OrderStaticDataEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderStaticDataEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(OrderStaticDataEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
