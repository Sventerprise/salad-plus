import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CurrentItemEffects } from './current-item.effects';

describe('CurrentItemEffects', () => {
  let actions$: Observable<any>;
  let effects: CurrentItemEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrentItemEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CurrentItemEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
