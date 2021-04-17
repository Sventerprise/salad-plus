import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { StaticOrderDataEffects } from './static-order-data.effects';

describe('StaticOrderDataEffects', () => {
  let actions$: Observable<any>;
  let effects: StaticOrderDataEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StaticOrderDataEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(StaticOrderDataEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
