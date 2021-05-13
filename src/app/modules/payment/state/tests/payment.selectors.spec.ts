import * as fromPayment from './payment.reducer';
import { selectPaymentState } from './payment.selectors';

describe('Payment Selectors', () => {
  it('should select the feature state', () => {
    const result = selectPaymentState({
      [fromPayment.paymentFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
