import * as fromStaticOrderData from './order-static-data.actions';

describe('loadStaticOrderData', () => {
  it('should return an action', () => {
    expect(fromStaticOrderData.loadStaticOrderData().type).toBe('[StaticOrderData] Load StaticOrderData');
  });
});
