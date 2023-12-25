import { Injectable } from '@angular/core';
import { User } from '../model/model';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs'
import{JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userPayload:any;
  constructor(private http:HttpClient) {
    this.userPayload=this.decodeToken()
   }
 
  private Base_Url="https://localhost:7036/api/Users";
  login(user:any)
  {
    console.log("serv   "+user)
    return this.http.post(`https://localhost:7036/api/Users/login`,user,{})
  }
  getuser(id:number):Observable<User>{
    return this.http.get<User>(`${this.Base_Url}/${id}`)
  }
  adduser(user:User)
  {
    return this.http.post(`${this.Base_Url}`,user,{observe:'response'})
  }
  storeToken(tokenValue:string){
    localStorage.setItem('token' , tokenValue) 
  }

  storelib_token(libtoken:number){
    localStorage.setItem('lib' , libtoken.toString()); 
  }
  getlob_token()
  {
    return localStorage.getItem('lib');
  }
  getToken(){
    return localStorage.getItem('token')
  }
  decodeToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token)
  }
  getNameFromToken(){
  
    if(this.userPayload)
    return this.userPayload.Name;
 }
 getEmailFromToken(){
   
    if(this.userPayload)
    return this.userPayload.Email;
 }
 getIdFromToken():any{
   
   if(this.userPayload)
   return this.userPayload.Id;
 }
//  setUsertostorage(user:User):void
//  {
//   const userJson= JSON.stringify(user);
//   localStorage.setItem('user', userJson);
//   //this..next(this.cart);
//  }
 getUserfromstorege(): User|null{

  const userJson = localStorage.getItem('user');
  return userJson ? JSON.parse(userJson) : null  
 }
 public isLoggedin():boolean{
  let tokenStr= localStorage.getItem('token');
  if(tokenStr==undefined || tokenStr==null || tokenStr=='' ){
    return false;
  }
  else{
    return true;
  }
}
// getUserFromLocalStorage(): User | null {
//   const userString = localStorage.getItem('user');

//   if (userString) {
//     try {
//       const user: User = JSON.parse(userString);
//       return user;
//     } catch (error) {
//       console.error('Error parsing user from local storage:', error);
//       return null;
//     }
//   }

//   return null;
// }
  logOut(){
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return true;
}
}
