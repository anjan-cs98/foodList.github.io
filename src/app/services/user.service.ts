import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient ) { }

  /*  ALL USER RELATED API END POINT */
   private user_URL:string='https://foodordersystem.glitch.me/api/user/';
   
  /*  USER SIGNUP  */
  SIGNUP(signupData:any){
    return this.http.post(`${this.user_URL}signup`,signupData); 
  }

  LOGIN(loginData:any){
    return this.http.post(`${this.user_URL}signin`,loginData);
  }
}
