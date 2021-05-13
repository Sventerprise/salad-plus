import * as fromPayment from '../payment.actions';

describe('loadPayments', () => {
  it('should return an action', () => {
    expect(fromPayment.loadPayments().type).toBe('[Payment] Load Payments');
  });
});
