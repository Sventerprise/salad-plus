import * as fromCurrentItem from './current-item.actions';

describe('loadCurrentItems', () => {
  it('should return an action', () => {
    expect(fromCurrentItem.loadCurrentItems().type).toBe('[CurrentItem] Load CurrentItems');
  });
});
