import * as fromOrderStaticData from '../reducers/order-static-data.reducer';
import { selectOrderStaticDataState } from './order-static-data.selectors';

describe('OrderStaticData Selectors', () => {
  it('should select the feature state', () => {
    const result = selectOrderStaticDataState({
      [fromOrderStaticData.orderStaticDataFeatureKey]: {}
    });

    // expect(result).toEqual({});
  });
});
