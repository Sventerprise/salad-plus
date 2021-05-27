import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { trxnResult } from "./models/TrxnResult";

@Injectable({
  providedIn: 'root'
})

export class PaymentService {
  constructor(private http: HttpClient) { }
  baseUrl = 'https://localhost:3000/'



  public getPayResultsDB(data): Observable<trxnResult> {
    const url = this.baseUrl + 'api/pay'
    return this.http.get<trxnResult>(url)
  }
}
