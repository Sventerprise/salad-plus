import * as fromShared from '../shared.reducer';
import { selectSharedState } from '../shared.selectors';

describe('Shared Selectors', () => {
  it('should select the feature state', () => {
    const result = selectSharedState({
      [fromShared.sharedFeatureKey]: {}
    });

    // expect(result).toEqual({});
  });
});
