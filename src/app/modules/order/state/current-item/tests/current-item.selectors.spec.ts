import * as fromCurrentItem from '../reducers/current-item.reducer';
import { selectCurrentItemState } from './current-item.selectors';

describe('CurrentItem Selectors', () => {
  it('should select the feature state', () => {
    const result = selectCurrentItemState({
      [fromCurrentItem.currentItemFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
