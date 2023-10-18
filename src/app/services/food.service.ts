import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FoodService {
  
  constructor(private http:HttpClient) { }
    
   /*--------------------All Food Related API Method-----------------  */
   private Base_Url:string='https://foodordersystem.glitch.me/api/';
   /*Get All Foods  */
   getAllFoods(){
      return this.http.get(`${this.Base_Url}foods`);
   }

   /*  ADD FOOD DATA  */
   addFoodData(Data:any){
    return this.http.post(`${this.Base_Url}food`,Data);
   }

   /* UPDATE FOOD DATA */
   updateFoodData(ID:any,Data:any){
     return this.http.put(`${this.Base_Url}food/${ID}`,Data);
   }

   /* DELETE FOOD DATA */
   deleteFoodData(ID:any){
     return this.http.delete(`${this.Base_Url}food/${ID}`);
   }



   
}
