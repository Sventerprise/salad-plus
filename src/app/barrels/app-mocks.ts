import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MockPaymentInterceptor } from "../mocks/payment.interceptor";

export const AppMockInterceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: MockPaymentInterceptor, multi: true }
]
