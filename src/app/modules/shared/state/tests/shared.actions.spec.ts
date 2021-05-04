import * as fromShared from './shared.actions';

describe('loadShareds', () => {
  it('should return an action', () => {
    expect(fromShared.loadShareds().type).toBe('[Shared] Load Shareds');
  });
});
