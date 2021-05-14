import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { trxnResult } from "./models/TrxnResult";

@Injectable({
  providedIn: 'root'
})

export class PaymentService {
  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhose:3000/'



  public getPayResultsDB(data): Observable<trxnResult> {
    console.log('Made it to the payment service')
    const url = this.baseUrl + 'api/pay'
    return this.http.get<trxnResult>(url)
  }
}
