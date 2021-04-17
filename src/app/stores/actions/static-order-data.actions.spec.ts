import * as fromStaticOrderData from './static-order-data.actions';

describe('loadStaticOrderDatas', () => {
  it('should return an action', () => {
    expect(fromStaticOrderData.loadStaticOrderDatas().type).toBe('[StaticOrderData] Load StaticOrderDatas');
  });
});
