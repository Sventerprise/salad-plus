import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { trxnResult } from "../modules/payment/models/TrxnResult";

@Injectable()
export class MockPaymentInterceptor implements HttpInterceptor {

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
    let date = new Date(Date.now()).toLocaleDateString('en-US');
    let rand = Math.round(Math.random() * 10000).toFixed(0)
    let transactionId = 'abc' + rand

    console.log('Made it to the interceptor')
    return randResult
      ? {
        transactionId: transactionId,
        status: 'approved',
        dateTime: date,
        amount: 5
      }
      : {
        transactionId: transactionId,
        status: 'declined',
        dateTime: date,
        amount: 5
      }
  }
}

