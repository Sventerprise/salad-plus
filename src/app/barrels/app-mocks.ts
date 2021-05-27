import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MockPaymentInterceptor } from "../mocks/payment.interceptor";
import { MockOrderStaticDataInterceptor } from "../mocks/staticData.interceptor";

export const AppMockInterceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: MockPaymentInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: MockOrderStaticDataInterceptor, multi: true }
]
