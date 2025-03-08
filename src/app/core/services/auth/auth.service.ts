import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:any = null;
  private readonly router =inject(Router);

  constructor(private httpClient:HttpClient) {
  }

  sendRegisterForm(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data)
  }
  sendLoginForm(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data)
  }

  saveUserData():void {
    if( localStorage.getItem('userToken')!== null){
      this.userData= jwtDecode (localStorage.getItem('userToken')!);

    }
  }

  logOut():void{
    localStorage.removeItem('userToken');
    this.userData=null;

    this.router.navigate(['/login']);

  }

  setEmailVerify( data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data )
  }
  setCodeVerify( data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data )
  }
  setResetPassword( data:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data )
  }
}
