import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PaymentEffects } from './payment.effects';

describe('PaymentEffects', () => {
  let actions$: Observable<any>;
  let effects: PaymentEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PaymentEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(PaymentEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
