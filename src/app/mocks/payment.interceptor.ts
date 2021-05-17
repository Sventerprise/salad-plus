import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { selectCartTotal } from "../modules/order/state/cart/cart.selectors";
import { trxnResult } from "../modules/payment/models/TrxnResult";

@Injectable()
export class MockPaymentInterceptor implements HttpInterceptor {
  constructor(private store: Store<{}>) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    if (req.method === 'GET' && req.url == 'http://localhose:3000/api/pay') {
      const result = this.getPayResultsMockData()
      const response = new HttpResponse({
        body: result
      })
      return of(response)
    }
    return next.handle(req)
  }


  public getPayResultsMockData(): trxnResult {
    let randResult: boolean = Math.round(Math.random()) == 0 ? true : false
    let date = new Date(Date.now()).toString()
    let rand = Math.round(Math.random() * 10000).toFixed(0)
    let transactionId = 'abc' + rand
    let amount: number
    this.store.select(selectCartTotal).subscribe(total =>
      amount = total
    )

    return randResult
      ? {
        transactionId: transactionId,
        status: 'approved',
        dateTime: date,
        amount: amount
      }
      : {
        transactionId: transactionId,
        status: 'declined',
        dateTime: date,
        amount: amount
      }
  }
}

