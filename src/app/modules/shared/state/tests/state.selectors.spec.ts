import * as fromState from './state.reducer';
import { selectStateState } from './state.selectors';

describe('State Selectors', () => {
  it('should select the feature state', () => {
    const result = selectStateState({
      [fromState.stateFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
