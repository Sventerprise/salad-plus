import * as fromStaticOrderData from '../reducers/static-order-data.reducer';
import { selectStaticOrderDataState } from './static-order-data.selectors';

describe('StaticOrderData Selectors', () => {
  it('should select the feature state', () => {
    const result = selectStaticOrderDataState({
      [fromStaticOrderData.staticOrderDataFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
