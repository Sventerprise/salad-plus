import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { OrderStaticData } from "src/app/modules/order/models/OrderStaticData";

@Injectable({
  providedIn: 'root'
})
export class OrderStaticDataService {
  constructor(
    private http: HttpClient
  ) { }

  baseUrl = 'https://localhost:3000/';

  getOrderStaticData(): Observable<OrderStaticData> {
    const url = this.baseUrl + 'orderStaticData/';
    const body = '';
    let htpOptions: {};

    return this.http.get<any>(url);
  }
}
