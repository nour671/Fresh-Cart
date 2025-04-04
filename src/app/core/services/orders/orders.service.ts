

import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {


  constructor(private httpClient: HttpClient) {}
  myToken: any  = localStorage.getItem('userToken');

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken') || '';
    return new HttpHeaders().set('token', token);
  }

  CreateCashOrder(data:object,id:string):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/${id}`,{
      "shippingAddress":data
    })
  }





  getAllOrders(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/` , {
      // headers:this.getAuthHeaders()
      headers:{
        token:this.myToken
      }

    })
  }

  getUserOrders(id: string): Observable<any> {
      return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}` , {
        // headers:this.getAuthHeaders()
        headers:{
          token:this.myToken
        }
      })

  }

  checkOutPayment(id:string , data:object):Observable<any>{
        return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
          {
              "shippingAddress": data

          },
          {
            // headers:this.getAuthHeaders()
            headers:{
              token:this.myToken
            }

          }
        )
      }
}
