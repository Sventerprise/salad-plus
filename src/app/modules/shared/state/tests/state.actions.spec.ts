import * as fromState from '../state.actions';

describe('loadStates', () => {
  it('should return an action', () => {
    expect(fromState.loadStates().type).toBe('[State] Load States');
  });
});
