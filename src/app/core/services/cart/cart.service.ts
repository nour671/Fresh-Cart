import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  myToken: any  = localStorage.getItem('userToken');

  constructor( private httpClient : HttpClient ) { }
  cartNumber : BehaviorSubject<number> = new BehaviorSubject(0);

  addProductToCart(id:string ):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart` ,
      {
        "productId": id

      },
      {
        headers:{
          token :this.myToken

        }
      }
    )
  }

  getLoggedUserCart():Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart` ,
      {
        headers:{
          token: this.myToken
        }
      }
    )
  }
  removeSpecificCartItem(id :string):Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        headers:{
          token:this.myToken
        }

      }
    )
  }

  updateCartQuantity(id:string , newCount:number):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        "count": newCount
      },

      {
        headers:{
          token:this.myToken
        }
      }
    )
  }

  clearCart():Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`,
      {
        headers:{
          token:this.myToken
        }

      }
    )
  }
}
